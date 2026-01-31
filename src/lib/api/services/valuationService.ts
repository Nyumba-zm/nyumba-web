// src/lib/api/services/valuationService.ts

import { apiClient } from '../client';
import type { CurrencyCode } from '@/types/api';
import type {
  ValuationResult,
  BackendValuationResult,
  RequestValuationDto,
  QuickValuationDto,
  ComparableProperty,
  BackendComparableProperty,
  MarketTrendData,
  NeighborhoodStats,
} from '@/types/valuation';

/**
 * Transform backend valuation result to frontend format
 */
function transformValuationResult(backend: BackendValuationResult): ValuationResult {
  return {
    id: backend.id,
    propertyId: backend.property_id,
    estimatedValue: backend.estimated_value,
    currency: backend.currency as CurrencyCode,
    valueRange: backend.value_range,
    confidenceScore: backend.confidence_score,
    accuracyRating: backend.accuracy_rating,
    factors: {
      locationScore: backend.factors.location_score,
      sizeScore: backend.factors.size_score,
      amenitiesScore: backend.factors.amenities_score,
      marketDemand: backend.factors.market_demand,
      conditionScore: backend.factors.condition_score,
      ageScore: backend.factors.age_score,
    },
    marketTrend: backend.market_trend,
    pricePerSqm: backend.price_per_sqm,
    comparableProperties: backend.comparable_properties,
    validUntil: backend.valid_until,
    createdAt: backend.created_at,
  };
}

/**
 * Transform backend comparable property
 */
function transformComparableProperty(backend: BackendComparableProperty): ComparableProperty {
  return {
    id: backend.id,
    title: backend.title,
    address: backend.address,
    price: backend.price,
    soldDate: backend.sold_date,
    bedrooms: backend.bedrooms,
    bathrooms: backend.bathrooms,
    areaSqm: backend.area_sqm,
    similarity: backend.similarity,
  };
}

/**
 * Valuation service
 */
export const valuationService = {
  /**
   * Request a valuation for an existing property
   */
  async requestValuation(data: RequestValuationDto): Promise<ValuationResult> {
    const response = await apiClient.post<BackendValuationResult>('/valuations', {
      property_id: data.propertyId,
    });
    return transformValuationResult(response);
  },

  /**
   * Get a quick valuation estimate (without existing property)
   */
  async getQuickValuation(data: QuickValuationDto): Promise<ValuationResult> {
    const response = await apiClient.post<BackendValuationResult>('/valuations/quick', {
      property_type: data.propertyType,
      city: data.city,
      county: data.county,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      area_sqm: data.areaSqm,
      year_built: data.yearBuilt,
      amenities: data.amenities,
    });
    return transformValuationResult(response);
  },

  /**
   * Get valuation history for a property
   */
  async getValuationHistory(propertyId: string): Promise<ValuationResult[]> {
    const response = await apiClient.get<BackendValuationResult[]>(
      `/valuations/property/${propertyId}`
    );
    return response.map(transformValuationResult);
  },

  /**
   * Get comparable properties for a valuation
   */
  async getComparables(
    valuationId: string,
    limit: number = 5
  ): Promise<ComparableProperty[]> {
    const response = await apiClient.get<BackendComparableProperty[]>(
      `/valuations/${valuationId}/comparables`,
      { limit }
    );
    return response.map(transformComparableProperty);
  },

  /**
   * Get market trends for an area
   */
  async getMarketTrends(
    city: string,
    county?: string,
    months: number = 12
  ): Promise<MarketTrendData[]> {
    const response = await apiClient.get<
      Array<{
        date: string;
        average_price: number;
        median_price: number;
        listing_count: number;
        sales_count: number;
      }>
    >('/valuations/market-trends', {
      city,
      county,
      months,
    });

    return response.map((item) => ({
      date: item.date,
      averagePrice: item.average_price,
      medianPrice: item.median_price,
      listingCount: item.listing_count,
      salesCount: item.sales_count,
    }));
  },

  /**
   * Get neighborhood statistics
   */
  async getNeighborhoodStats(city: string): Promise<NeighborhoodStats[]> {
    const response = await apiClient.get<
      Array<{
        name: string;
        average_price: number;
        price_per_sqm: number;
        trend: 'rising' | 'stable' | 'falling';
        trend_percentage: number;
        listing_count: number;
        days_on_market: number;
      }>
    >('/valuations/neighborhood-stats', { city });

    return response.map((item) => ({
      name: item.name,
      averagePrice: item.average_price,
      pricePerSqm: item.price_per_sqm,
      trend: item.trend,
      trendPercentage: item.trend_percentage,
      listingCount: item.listing_count,
      daysOnMarket: item.days_on_market,
    }));
  },
};
