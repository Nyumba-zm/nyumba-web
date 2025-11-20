// src/lib/api/properties.ts

import { apiClient } from './client';
import type {
  Property,
  PropertySearchParams,
  PaginatedProperties,
} from '@/types/property';
import type { ApiResponse } from '@/types/api';

export const propertiesApi = {
  /**
   * Get all properties with optional filters
   */
  getProperties: async (
    params?: PropertySearchParams
  ): Promise<ApiResponse<PaginatedProperties>> => {
    return apiClient.get('/properties', params as Record<string, unknown>);
  },

  /**
   * Get a single property by ID
   */
  getPropertyById: async (id: string): Promise<ApiResponse<Property>> => {
    return apiClient.get(`/properties/${id}`);
  },

  /**
   * Create a new property listing
   */
  createProperty: async (
    propertyData: Partial<Property>
  ): Promise<ApiResponse<Property>> => {
    return apiClient.post('/properties', propertyData);
  },

  /**
   * Update an existing property
   */
  updateProperty: async (
    id: string,
    propertyData: Partial<Property>
  ): Promise<ApiResponse<Property>> => {
    return apiClient.put(`/properties/${id}`, propertyData);
  },

  /**
   * Delete a property
   */
  deleteProperty: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/properties/${id}`);
  },

  /**
   * Get featured properties
   */
  getFeaturedProperties: async (): Promise<ApiResponse<Property[]>> => {
    return apiClient.get('/properties/featured');
  },

  /**
   * Get trending properties
   */
  getTrendingProperties: async (): Promise<ApiResponse<Property[]>> => {
    return apiClient.get('/properties/trending');
  },

  /**
   * Get similar properties
   */
  getSimilarProperties: async (
    propertyId: string
  ): Promise<ApiResponse<Property[]>> => {
    return apiClient.get(`/properties/${propertyId}/similar`);
  },

  /**
   * Increment property view count
   */
  incrementViewCount: async (
    propertyId: string
  ): Promise<ApiResponse<void>> => {
    return apiClient.post(`/properties/${propertyId}/view`);
  },

  /**
   * Upload property images
   */
  uploadImages: async (
    propertyId: string,
    images: File[],
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<string[]>> => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });

    return apiClient.uploadFile(
      `/properties/${propertyId}/images`,
      formData,
      onProgress
    );
  },

  /**
   * Delete a property image
   */
  deleteImage: async (
    propertyId: string,
    imageId: string
  ): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/properties/${propertyId}/images/${imageId}`);
  },

  /**
   * Save property to favorites
   */
  saveProperty: async (propertyId: string): Promise<ApiResponse<void>> => {
    return apiClient.post(`/properties/${propertyId}/save`);
  },

  /**
   * Remove property from favorites
   */
  unsaveProperty: async (propertyId: string): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/properties/${propertyId}/save`);
  },

  /**
   * Get user's saved properties
   */
  getSavedProperties: async (): Promise<ApiResponse<Property[]>> => {
    return apiClient.get('/properties/saved');
  },
};