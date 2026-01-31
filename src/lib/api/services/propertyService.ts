// src/lib/api/services/propertyService.ts

import { apiClient } from '../client';
import {
  transformProperty,
  transformPaginatedProperties,
  transformCreatePropertyToBackend,
  transformSearchParamsToBackend,
} from '../transformers';
import type { BackendPaginatedResponse } from '@/types/api';
import type {
  Property,
  BackendProperty,
  CreatePropertyDto,
  UpdatePropertyDto,
  PropertySearchParams,
  PropertyImage,
} from '@/types/property';
import type { PaginatedResponse } from '@/types/api';

/**
 * Property service
 */
export const propertyService = {
  /**
   * Get paginated list of properties with filters
   */
  async getProperties(params?: PropertySearchParams): Promise<PaginatedResponse<Property>> {
    const backendParams = params ? transformSearchParamsToBackend(params) : undefined;
    const response = await apiClient.get<BackendPaginatedResponse<BackendProperty>>(
      '/properties',
      backendParams
    );
    return transformPaginatedProperties(response);
  },

  /**
   * Get a single property by ID
   */
  async getPropertyById(id: string): Promise<Property> {
    const response = await apiClient.get<BackendProperty>(`/properties/${id}`);
    return transformProperty(response);
  },

  /**
   * Create a new property listing
   */
  async createProperty(data: CreatePropertyDto): Promise<Property> {
    const backendData = transformCreatePropertyToBackend(data);
    const response = await apiClient.post<BackendProperty>('/properties', backendData);
    return transformProperty(response);
  },

  /**
   * Update a property listing
   */
  async updateProperty(id: string, data: UpdatePropertyDto): Promise<Property> {
    const backendData = transformCreatePropertyToBackend(data as CreatePropertyDto);
    const response = await apiClient.patch<BackendProperty>(`/properties/${id}`, backendData);
    return transformProperty(response);
  },

  /**
   * Delete a property listing
   */
  async deleteProperty(id: string): Promise<void> {
    await apiClient.delete(`/properties/${id}`);
  },

  /**
   * Get featured properties
   */
  async getFeaturedProperties(limit: number = 6): Promise<Property[]> {
    const response = await apiClient.get<BackendPaginatedResponse<BackendProperty>>(
      '/properties',
      { is_featured: true, page_size: limit }
    );
    return response.items.map(transformProperty);
  },

  /**
   * Get similar properties
   */
  async getSimilarProperties(propertyId: string, limit: number = 4): Promise<Property[]> {
    const response = await apiClient.get<BackendPaginatedResponse<BackendProperty>>(
      `/properties/${propertyId}/similar`,
      { page_size: limit }
    );
    return response.items.map(transformProperty);
  },

  /**
   * Get properties by owner
   */
  async getMyProperties(params?: PropertySearchParams): Promise<PaginatedResponse<Property>> {
    const backendParams = params ? transformSearchParamsToBackend(params) : undefined;
    const response = await apiClient.get<BackendPaginatedResponse<BackendProperty>>(
      '/properties/my',
      backendParams
    );
    return transformPaginatedProperties(response);
  },

  /**
   * Save/unsave a property (favorite)
   */
  async toggleSaveProperty(propertyId: string): Promise<{ saved: boolean }> {
    const response = await apiClient.post<{ saved: boolean }>(
      `/properties/${propertyId}/save`
    );
    return response;
  },

  /**
   * Get saved properties
   */
  async getSavedProperties(params?: PropertySearchParams): Promise<PaginatedResponse<Property>> {
    const backendParams = params ? transformSearchParamsToBackend(params) : undefined;
    const response = await apiClient.get<BackendPaginatedResponse<BackendProperty>>(
      '/properties/saved',
      backendParams
    );
    return transformPaginatedProperties(response);
  },

  /**
   * Upload property images
   */
  async uploadImages(
    propertyId: string,
    files: File[],
    onProgress?: (progress: number) => void
  ): Promise<PropertyImage[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));

    const response = await apiClient.uploadFile<{ images: string[] }>(
      `/properties/${propertyId}/images`,
      formData,
      onProgress
    );

    return response.images.map((url, index) => ({
      id: `img-${index}`,
      url,
      isPrimary: index === 0,
      displayOrder: index,
    }));
  },

  /**
   * Delete a property image
   */
  async deleteImage(propertyId: string, imageId: string): Promise<void> {
    await apiClient.delete(`/properties/${propertyId}/images/${imageId}`);
  },

  /**
   * Increment view count
   */
  async incrementViewCount(propertyId: string): Promise<void> {
    await apiClient.post(`/properties/${propertyId}/view`);
  },

  /**
   * Update property status
   */
  async updateStatus(propertyId: string, status: string): Promise<Property> {
    const response = await apiClient.patch<BackendProperty>(
      `/properties/${propertyId}/status`,
      { status }
    );
    return transformProperty(response);
  },
};
