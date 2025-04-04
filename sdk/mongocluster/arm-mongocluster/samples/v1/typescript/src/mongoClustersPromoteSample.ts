// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to promotes a replica mongo cluster to a primary role.
 *
 * @summary promotes a replica mongo cluster to a primary role.
 * x-ms-original-file: 2024-07-01/MongoClusters_ForcePromoteReplica.json
 */
async function promotesAReplicaMongoClusterResourceToAPrimaryRole(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  await client.mongoClusters.promote("TestGroup", "myMongoCluster", {
    promoteOption: "Forced",
    mode: "Switchover",
  });
}

async function main(): Promise<void> {
  promotesAReplicaMongoClusterResourceToAPrimaryRole();
}

main().catch(console.error);
