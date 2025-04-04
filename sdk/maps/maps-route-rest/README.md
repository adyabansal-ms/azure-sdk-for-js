# Azure MapsRoute client library for JavaScript/TypeScript

The Route Directions and Route Matrix APIs in Azure Maps Route Service can be used to calculate the estimated arrival times (ETAs) for each requested route. Route APIs consider factors such as real-time traffic information and historic traffic data, like the typical road speeds on the requested day of the week and time of day. The APIs return the shortest or fastest routes available to multiple destinations at a time in sequence or in optimized order, based on time or distance. Users can also request specialized routes and details for walkers, bicyclists, and commercial vehicles like trucks.

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

Key links:

- [Source code][source_code]
- [Package (NPM)][npm_link]
- [API reference documentation][api_ref]
- [Product Information](https://learn.microsoft.com/rest/api/maps/route)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge and Firefox.

### Prerequisites

- An [Azure subscription][azure_sub].
- An [Azure Maps account](https://learn.microsoft.com/azure/azure-maps/how-to-manage-account-keys). You can create the resource via the [Azure Portal][azure_portal], the [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

If you use Azure CLI, replace `<resource-group-name>` and `<map-account-name>` of your choice, and select a proper [pricing tier](https://learn.microsoft.com/azure/azure-maps/choose-pricing-tier) based on your needs via the `<sku-name>` parameter. Please refer to [this page](https://learn.microsoft.com/cli/azure/maps/account?view=azure-cli-latest#az_maps_account_create) for more details.

### Install the `@azure-rest/maps-route` package

Install the Azure MapsRoute client REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/maps-route
```

### Create and authenticate a `MapsRouteClient`

To create a client object to access the Azure Maps Route APIs, you will need a `credential` object. The Azure Maps Route client can use a Microsoft Entra ID credential or an Azure Key credential to authenticate.

#### Using a Microsoft Entra ID Credential

You can authenticate with Microsoft Entra ID using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to register a new Microsoft Entra ID application and grant access to Azure Maps by assigning the suitable role to your service principal. Please refer to the [Manage authentication](https://learn.microsoft.com/azure/azure-maps/how-to-manage-authentication) page.

Set the values of the client ID, tenant ID, and client secret of the Microsoft Entra ID application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

You will also need to specify the Azure Maps resource you intend to use by specifying the `clientId` in the client options.
The Azure Maps resource client id can be found in the Authentication sections in the Azure Maps resource. Please refer to the [documentation](https://learn.microsoft.com/azure/azure-maps/how-to-manage-authentication#view-authentication-details) on how to find it.

```ts snippet:ReadmeSampleCreateClient_TokenCredential
import { DefaultAzureCredential } from "@azure/identity";
import MapsRoute from "@azure-rest/maps-route";

const credential = new DefaultAzureCredential();
const client = MapsRoute(credential, "<maps-account-client-id>");
```

#### Using a Subscription Key Credential

You can authenticate with your Azure Maps Subscription Key.

```ts snippet:ReadmeSampleCreateClient_SubscriptionKey
import { AzureKeyCredential } from "@azure/core-auth";
import MapsRoute from "@azure-rest/maps-route";

const credential = new AzureKeyCredential("<subscription-key>");
const client = MapsRoute(credential);
```

#### Using a Shared Access Signature (SAS) Token Credential

Shared access signature (SAS) tokens are authentication tokens created using the JSON Web token (JWT) format and are cryptographically signed to prove authentication for an application to the Azure Maps REST API.

You can get the SAS token using [`AzureMapsManagementClient.accounts.listSas`](https://learn.microsoft.com/javascript/api/%40azure/arm-maps/accounts?view=azure-node-latest#@azure-arm-maps-accounts-listsas) from ["@azure/arm-maps"](https://www.npmjs.com/package/@azure/arm-maps) package. Please follow the section [Create and authenticate a `AzureMapsManagementClient`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/arm-maps#create-and-authenticate-a-azuremapsmanagementclient) to setup first.

Second, follow [Managed identities for Azure Maps](https://techcommunity.microsoft.com/t5/azure-maps-blog/managed-identities-for-azure-maps/ba-p/3666312) to create a managed identity for your Azure Maps account. Copy the principal ID (object ID) of the managed identity.

Third, you will need to install["@azure/core-auth"](https://www.npmjs.com/package/@azure/core-auth)package to use `AzureSASCredential`:

```bash
npm install @azure/core-auth
```

Finally, you can use the SAS token to authenticate the client:

```ts snippet:ReadmeSampleCreateClient_SAS
import { DefaultAzureCredential } from "@azure/identity";
import { AzureMapsManagementClient } from "@azure/arm-maps";
import { AzureSASCredential } from "@azure/core-auth";
import MapsRoute from "@azure-rest/maps-route";

const subscriptionId = "<subscription ID of the map account>";
const resourceGroupName = "<resource group name of the map account>";
const accountName = "<name of the map account>";
const mapsAccountSasParameters = {
  start: "<start time in ISO format>", // e.g. "2023-11-24T03:51:53.161Z"
  expiry: "<expiry time in ISO format>", // maximum value to start + 1 day
  maxRatePerSecond: 500,
  principalId: "<principle ID (object ID) of the managed identity>",
  signingKey: "primaryKey",
};

const credential = new DefaultAzureCredential();
const managementClient = new AzureMapsManagementClient(credential, subscriptionId);
const { accountSasToken } = await managementClient.accounts.listSas(
  resourceGroupName,
  accountName,
  mapsAccountSasParameters,
);

if (accountSasToken === undefined) {
  throw new Error("No accountSasToken was found for the Maps Account.");
}

const sasCredential = new AzureSASCredential(accountSasToken);
const client = MapsRoute(sasCredential);
```

## Examples

The following sections provide several code snippets covering some of the most common Azure Maps Route tasks, including:

- [Request historic and real-time data](#request-historic-and-real-time-data)
- [Request a route for a commercial vehicle](#request-a-route-for-a-commercial-vehicle)
- [Calculate and optimize a multi-stop route](#calculate-and-optimize-a-multi-stop-route)

### Request historic and real-time data

By default, the Route service assumes the traveling mode is a car and the departure time is now. It returns route based on real-time traffic conditions unless a route calculation request specifies otherwise.

To retrieve the route direction, you need to pass in the parameters the coordinates through which the route is calculated, delimited by a colon. A minimum of two coordinates are required. The first one is the origin and the last is the destination of the route.

By default, the Route service will return an array of coordinates. The response will contain the coordinates that make up the path in a list named points. Route response also includes the distance from the start of the route and the estimated elapsed time. These values can be used to calculate the average speed for the entire route.

```ts snippet:ReadmeSampleRouteDirections
import { DefaultAzureCredential } from "@azure/identity";
import MapsRoute, { toColonDelimitedLatLonString, isUnexpected } from "@azure-rest/maps-route";

const credential = new DefaultAzureCredential();
const client = MapsRoute(credential, "<maps-account-client-id>");

const routeDirectionsResult1 = await client.path("/route/directions/{format}", "json").get({
  queryParameters: {
    query: "51.368752,-0.118332:41.385426,-0.128929",
  },
});

// You can use the helper function `toColonDelimitedLatLonString` to compose the query string.
const routeDirectionsResult2 = await client.path("/route/directions/{format}", "json").get({
  queryParameters: {
    query: toColonDelimitedLatLonString([
      // Origin:
      [51.368752, -0.118332],
      // Waypoints (Optional):
      [45.49735, 9.182435],
      [48.886128, 2.329742],
      [48.159642, 11.518011],
      // Destination:
      [41.385426, -0.128929],
    ]),
  },
});

// Handle the error if the request failed
if (isUnexpected(routeDirectionsResult2)) {
  throw routeDirectionsResult2.body.error;
}

routeDirectionsResult2.body.routes.forEach(({ summary, legs }) => {
  console.log(
    `The total distance is ${summary.lengthInMeters} meters, and it takes ${summary.travelTimeInSeconds} seconds.`,
  );
  legs.forEach(({ summary, points }, idx) => {
    console.log(
      `The ${idx + 1}th leg's length is ${summary.lengthInMeters} meters, and it takes ${summary.travelTimeInSeconds} seconds. Followings are the first 10 points: `,
    );
    console.table(points.slice(0, 10));
  });
});
```

### Request a route for a commercial vehicle

The service supports commercial vehicle routing, covering commercial trucks routing. The APIs consider specified limits. Such as, the height and weight of the vehicle, and if the vehicle is carrying hazardous cargo. For example, if a vehicle is carrying flammable, the routing engine avoid certain tunnels that are near residential areas.

```ts snippet:ReadmeSampleRouteDirectionsCommercialVehicle
import { DefaultAzureCredential } from "@azure/identity";
import MapsRoute, { toColonDelimitedLatLonString, isUnexpected } from "@azure-rest/maps-route";

const credential = new DefaultAzureCredential();
const client = MapsRoute(credential, "<maps-account-client-id>");

const routeDirectionsResult = await client.path("/route/directions/{format}", "json").get({
  queryParameters: {
    query: toColonDelimitedLatLonString([
      // Origin
      [51.368752, -0.118332],
      // Waypoints (Optional):
      [45.49735, 9.182435],
      [48.886128, 2.329742],
      [48.159642, 11.518011],
      // Destination:
      [41.385426, -0.128929],
    ]),
    vehicleWidthInMeters: 2,
    vehicleHeightInMeters: 2,
    vehicleLoadType: "USHazmatClass1",
    travelMode: "truck",
    isCommercialVehicle: true,
  },
});

if (isUnexpected(routeDirectionsResult)) {
  throw routeDirectionsResult.body.error;
}

routeDirectionsResult.body.routes.forEach(({ summary, legs }) => {
  console.log(
    `The total distance is ${summary.lengthInMeters} meters, and it takes ${summary.travelTimeInSeconds} seconds.`,
  );
  legs.forEach(({ summary, points }, idx) => {
    console.log(
      `The ${idx + 1}th leg's length is ${summary.lengthInMeters} meters, and it takes ${summary.travelTimeInSeconds} seconds. Followings are the first 10 points: `,
    );
    console.table(points.slice(0, 10));
  });
});
```

### Calculate and optimize a multi-stop route

Azure Maps currently provides two forms of route optimizations:

- Optimizations based on the requested route type, without changing the order of waypoints. You can find the [supported route types here](https://learn.microsoft.com/rest/api/maps/route/post-route-directions?tabs=HTTP#routetype).
- Traveling salesman optimization, which changes the order of the waypoints to obtain the best order to visit each stop

For multi-stop routing, up to 150 waypoints may be specified in a single route request. The starting and ending coordinate locations can be the same, as would be the case with a round trip. But you need to provide at least one additional waypoint to make the route calculation. Waypoints can be added to the query in-between the origin and destination coordinates.

If you want to optimize the best order to visit the given waypoints, then you need to specify `computeBestWaypointOrder=true`. This scenario is also known as the traveling salesman optimization problem.

```ts snippet:ReadmeSampleRouteDirectionsOptimize
import { DefaultAzureCredential } from "@azure/identity";
import MapsRoute, { toColonDelimitedLatLonString, isUnexpected } from "@azure-rest/maps-route";

const credential = new DefaultAzureCredential();
const client = MapsRoute(credential, "<maps-account-client-id>");

const routeDirectionsResult = await client.path("/route/directions/{format}", "json").get({
  queryParameters: {
    query: toColonDelimitedLatLonString([
      // Origin:
      [51.368752, -0.118332],
      // Waypoints:
      [45.49735, 9.182435],
      [48.886128, 2.329742],
      [48.159642, 11.518011],
      // Destination:
      [41.385426, -0.128929],
    ]),
    computeBestOrder: true,
    routeType: "shortest",
  },
});

if (isUnexpected(routeDirectionsResult)) {
  throw routeDirectionsResult.body.error;
}

const { summary } = routeDirectionsResult.body.routes[0];
console.log(
  `The optimized distance is ${summary.lengthInMeters} meters, and it takes ${summary.travelTimeInSeconds} seconds.`,
);
console.log("The route is optimized by: ");
routeDirectionsResult.body.optimizedWaypoints.forEach(
  ({ providedIndex, optimizedIndex }) => `Moving index ${providedIndex} to ${optimizedIndex}`,
);
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the [samples][samples] directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)



[source_code]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-route-rest
[npm_link]: https://www.npmjs.com/package/@azure-rest/maps-route
[api_ref]: https://learn.microsoft.com/javascript/api/@azure-rest/maps-route
[samples]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-route-rest/samples
[azure_cli]: https://learn.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://learn.microsoft.com/powershell/module/az.maps/new-azmapsaccount
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#defaultazurecredential
