// src/lib/api/services/propertyService.ts
//
// One method per backend route in nyumba-backend/src/nyumba/properties/presentation/routes.py.

import { apiClient } from '../client';
import {
  transformCreatePropertyToBackend,
  transformProperty,
  transformPropertyDetail,
  transformPropertyList,
  transformSearchParamsToBackend,
  transformUpdatePropertyToBackend,
} from '../transformers';
import type { PaginatedResponse, PaginationParams } from '@/types/api';
import type {
  BackendProperty,
  BackendPropertyDetail,
  BackendPropertyList,
  BackendUploadImagesResponse,
  CreatePropertyDto,
  Property,
  PropertyDetail,
  PropertySearchParams,
  UpdatePropertyDto,
} from '@/types/property';

export const propertyService = {
  /** GET /properties — active listings only, newest first. */
  async search(params: PropertySearchParams = {}): Promise<PaginatedResponse<Property>> {
    const response = await apiClient.get<BackendPropertyList>(
      '/properties',
      transformSearchParamsToBackend(params)
    );
    return transformPropertyList(response);
  },

  /** GET /properties/{id} — includes seller contact + WhatsApp link. */
  async getById(id: string): Promise<PropertyDetail> {
    const response = await apiClient.get<BackendPropertyDetail>(`/properties/${id}`);
    return transformPropertyDetail(response);
  },

  /** GET /properties/mine — the caller's listings in every status (auth). */
  async getMine({ page, pageSize }: PaginationParams = {}): Promise<PaginatedResponse<Property>> {
    const response = await apiClient.get<BackendPropertyList>('/properties/mine', {
      page,
      page_size: pageSize,
    });
    return transformPropertyList(response);
  },

  /** POST /properties — creates a draft (auth). */
  async create(data: CreatePropertyDto): Promise<Property> {
    const response = await apiClient.post<BackendProperty>(
      '/properties',
      transformCreatePropertyToBackend(data)
    );
    return transformProperty(response);
  },

  /** PUT /properties/{id} — partial update of mutable fields (owner only). */
  async update(id: string, data: UpdatePropertyDto): Promise<Property> {
    const response = await apiClient.put<BackendProperty>(
      `/properties/${id}`,
      transformUpdatePropertyToBackend(data)
    );
    return transformProperty(response);
  },

  /** POST /properties/{id}/images — multipart field `files`, max 10 (owner only). */
  async uploadImages(
    id: string,
    files: File[],
    onProgress?: (percent: number) => void
  ): Promise<string[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    const response = await apiClient.upload<BackendUploadImagesResponse>(
      `/properties/${id}/images`,
      formData,
      onProgress
    );
    return response.image_urls;
  },

  /** POST /properties/{id}/publish — draft → active; requires at least one image (204). */
  async publish(id: string): Promise<void> {
    await apiClient.post<void>(`/properties/${id}/publish`);
  },
};
