/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
/**
 * This sample demonstrates how to Obtains the liveness status of the process during the specified time interval.
 *
 * @summary Obtains the liveness status of the process during the specified time interval.
 * x-ms-original-file: specification/service-map/resource-manager/Microsoft.OperationalInsights/preview/2015-11-01-preview/examples/Machines/Processes/SMMachinesProcessesGetLivenessGet.json
 */
import { ServiceMap } from "@azure/arm-servicemap";
import { DefaultAzureCredential } from "@azure/identity";

async function smMachinesProcessesGetLivenessGet(): Promise<void> {
  const subscriptionId = "63BE4E24-FDF0-4E9C-9342-6A5D5A359722";
  const resourceGroupName = "rg-sm";
  const workspaceName = "D6F79F14-E563-469B-84B5-9286D2803B2F";
  const machineName = "m-36b83664-0822-4fb3-99a3-8332754f3eae";
  const processName = "p-bbf99526b8fc5e7ee4f75568958a040d08489160";
  const startTime = new Date("2018-01-07T07:07:27.6026938Z");
  const endTime = new Date("2018-01-07T07:09:27.6026938Z");
  const options = { startTime: startTime, endTime: endTime };
  const credential = new DefaultAzureCredential();
  const client = new ServiceMap(credential, subscriptionId);
  const result = await client.processes.getLiveness(
    resourceGroupName,
    workspaceName,
    machineName,
    processName,
    options,
  );
  console.log(result);
}

smMachinesProcessesGetLivenessGet().catch(console.error);
