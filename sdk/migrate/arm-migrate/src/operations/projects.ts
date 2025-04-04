/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { Projects } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { AzureMigrateV2 } from "../azureMigrateV2.js";
import {
  Project,
  ProjectsListBySubscriptionNextOptionalParams,
  ProjectsListBySubscriptionOptionalParams,
  ProjectsListBySubscriptionResponse,
  ProjectsListNextOptionalParams,
  ProjectsListOptionalParams,
  ProjectsListResponse,
  AssessmentOptions,
  ProjectsAssessmentOptionsListOptionalParams,
  ProjectsAssessmentOptionsListResponse,
  ProjectsGetOptionalParams,
  ProjectsGetResponse,
  ProjectsCreateOptionalParams,
  ProjectsCreateResponse,
  ProjectsUpdateOptionalParams,
  ProjectsUpdateResponse,
  ProjectsDeleteOptionalParams,
  ProjectsDeleteResponse,
  ProjectsAssessmentOptionsOptionalParams,
  ProjectsAssessmentOptionsResponse,
  ProjectsListBySubscriptionNextResponse,
  ProjectsListNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Projects operations. */
export class ProjectsImpl implements Projects {
  private readonly client: AzureMigrateV2;

  /**
   * Initialize a new instance of the class Projects class.
   * @param client Reference to the service client
   */
  constructor(client: AzureMigrateV2) {
    this.client = client;
  }

  /**
   * Get all the projects in the subscription.
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: ProjectsListBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<Project> {
    const iter = this.listBySubscriptionPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listBySubscriptionPagingPage(options, settings);
      }
    };
  }

  private async *listBySubscriptionPagingPage(
    options?: ProjectsListBySubscriptionOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<Project[]> {
    let result: ProjectsListBySubscriptionResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listBySubscription(options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listBySubscriptionNext(continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listBySubscriptionPagingAll(
    options?: ProjectsListBySubscriptionOptionalParams
  ): AsyncIterableIterator<Project> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Get all the projects in the resource group.
   * @param resourceGroupName Name of the Azure Resource Group that project is part of.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    options?: ProjectsListOptionalParams
  ): PagedAsyncIterableIterator<Project> {
    const iter = this.listPagingAll(resourceGroupName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listPagingPage(resourceGroupName, options, settings);
      }
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    options?: ProjectsListOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<Project[]> {
    let result: ProjectsListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(resourceGroupName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    options?: ProjectsListOptionalParams
  ): AsyncIterableIterator<Project> {
    for await (const page of this.listPagingPage(resourceGroupName, options)) {
      yield* page;
    }
  }

  /**
   * Gets list of all available options for the properties of an assessment on a project.
   * @param resourceGroupName Name of the Azure Resource Group that project is part of.
   * @param projectName Name of the Azure Migrate project.
   * @param options The options parameters.
   */
  public listAssessmentOptionsList(
    resourceGroupName: string,
    projectName: string,
    options?: ProjectsAssessmentOptionsListOptionalParams
  ): PagedAsyncIterableIterator<AssessmentOptions> {
    const iter = this.assessmentOptionsListPagingAll(
      resourceGroupName,
      projectName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.assessmentOptionsListPagingPage(
          resourceGroupName,
          projectName,
          options,
          settings
        );
      }
    };
  }

  private async *assessmentOptionsListPagingPage(
    resourceGroupName: string,
    projectName: string,
    options?: ProjectsAssessmentOptionsListOptionalParams,
    _settings?: PageSettings
  ): AsyncIterableIterator<AssessmentOptions[]> {
    let result: ProjectsAssessmentOptionsListResponse;
    result = await this._assessmentOptionsList(
      resourceGroupName,
      projectName,
      options
    );
    yield result.value || [];
  }

  private async *assessmentOptionsListPagingAll(
    resourceGroupName: string,
    projectName: string,
    options?: ProjectsAssessmentOptionsListOptionalParams
  ): AsyncIterableIterator<AssessmentOptions> {
    for await (const page of this.assessmentOptionsListPagingPage(
      resourceGroupName,
      projectName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Get all the projects in the subscription.
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: ProjectsListBySubscriptionOptionalParams
  ): Promise<ProjectsListBySubscriptionResponse> {
    return this.client.sendOperationRequest(
      { options },
      listBySubscriptionOperationSpec
    );
  }

  /**
   * Get all the projects in the resource group.
   * @param resourceGroupName Name of the Azure Resource Group that project is part of.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    options?: ProjectsListOptionalParams
  ): Promise<ProjectsListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listOperationSpec
    );
  }

  /**
   * Get the project with the specified name.
   * @param resourceGroupName Name of the Azure Resource Group that project is part of.
   * @param projectName Name of the Azure Migrate project.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    projectName: string,
    options?: ProjectsGetOptionalParams
  ): Promise<ProjectsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, projectName, options },
      getOperationSpec
    );
  }

  /**
   * Create a project with specified name. If a project already exists, update it.
   * @param resourceGroupName Name of the Azure Resource Group that project is part of.
   * @param projectName Name of the Azure Migrate project.
   * @param options The options parameters.
   */
  create(
    resourceGroupName: string,
    projectName: string,
    options?: ProjectsCreateOptionalParams
  ): Promise<ProjectsCreateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, projectName, options },
      createOperationSpec
    );
  }

  /**
   * Update a project with specified name. Supports partial updates, for example only tags can be
   * provided.
   * @param resourceGroupName Name of the Azure Resource Group that project is part of.
   * @param projectName Name of the Azure Migrate project.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    projectName: string,
    options?: ProjectsUpdateOptionalParams
  ): Promise<ProjectsUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, projectName, options },
      updateOperationSpec
    );
  }

  /**
   * Delete the project. Deleting non-existent project is a no-operation.
   * @param resourceGroupName Name of the Azure Resource Group that project is part of.
   * @param projectName Name of the Azure Migrate project.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    projectName: string,
    options?: ProjectsDeleteOptionalParams
  ): Promise<ProjectsDeleteResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, projectName, options },
      deleteOperationSpec
    );
  }

  /**
   * Get all available options for the properties of an assessment on a project.
   * @param resourceGroupName Name of the Azure Resource Group that project is part of.
   * @param projectName Name of the Azure Migrate project.
   * @param assessmentOptionsName Name of the assessment options. The only name accepted in default.
   * @param options The options parameters.
   */
  assessmentOptions(
    resourceGroupName: string,
    projectName: string,
    assessmentOptionsName: string,
    options?: ProjectsAssessmentOptionsOptionalParams
  ): Promise<ProjectsAssessmentOptionsResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, projectName, assessmentOptionsName, options },
      assessmentOptionsOperationSpec
    );
  }

  /**
   * Gets list of all available options for the properties of an assessment on a project.
   * @param resourceGroupName Name of the Azure Resource Group that project is part of.
   * @param projectName Name of the Azure Migrate project.
   * @param options The options parameters.
   */
  private _assessmentOptionsList(
    resourceGroupName: string,
    projectName: string,
    options?: ProjectsAssessmentOptionsListOptionalParams
  ): Promise<ProjectsAssessmentOptionsListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, projectName, options },
      assessmentOptionsListOperationSpec
    );
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  private _listBySubscriptionNext(
    nextLink: string,
    options?: ProjectsListBySubscriptionNextOptionalParams
  ): Promise<ProjectsListBySubscriptionNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listBySubscriptionNextOperationSpec
    );
  }

  /**
   * ListNext
   * @param resourceGroupName Name of the Azure Resource Group that project is part of.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    nextLink: string,
    options?: ProjectsListNextOptionalParams
  ): Promise<ProjectsListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options },
      listNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listBySubscriptionOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Migrate/assessmentProjects",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProjectResultList,
      headersMapper: Mappers.ProjectsListBySubscriptionHeaders
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProjectResultList,
      headersMapper: Mappers.ProjectsListHeaders
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Project,
      headersMapper: Mappers.ProjectsGetHeaders
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.projectName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.Project,
      headersMapper: Mappers.ProjectsCreateHeaders
    },
    201: {
      bodyMapper: Mappers.Project,
      headersMapper: Mappers.ProjectsCreateHeaders
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.project,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.projectName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.Project,
      headersMapper: Mappers.ProjectsUpdateHeaders
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.project,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.projectName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}",
  httpMethod: "DELETE",
  responses: {
    200: {
      headersMapper: Mappers.ProjectsDeleteHeaders
    },
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.projectName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const assessmentOptionsOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/assessmentOptions/{assessmentOptionsName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AssessmentOptions,
      headersMapper: Mappers.ProjectsAssessmentOptionsHeaders
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.projectName,
    Parameters.assessmentOptionsName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const assessmentOptionsListOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/assessmentOptions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AssessmentOptionsResultList,
      headersMapper: Mappers.ProjectsAssessmentOptionsListHeaders
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.projectName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listBySubscriptionNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProjectResultList,
      headersMapper: Mappers.ProjectsListBySubscriptionNextHeaders
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProjectResultList,
      headersMapper: Mappers.ProjectsListNextHeaders
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
