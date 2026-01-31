// src/types/valuation.ts

import type { CurrencyCode } from './api';
import type { PropertyType } from './property';

/**
 * Valuation accuracy rating
 */
export type AccuracyRating = 'low' | 'medium' | 'high';

/**
 * Market trend direction
 */
export type MarketTrend = 'rising' | 'stable' | 'falling';

/**
 * Value range
 */
export interface ValueRange {
  low: number;
  high: number;
}

/**
 * Valuation factors
 */
export interface ValuationFactors {
  locationScore: number;
  sizeScore: number;
  amenitiesScore: number;
  marketDemand: number;
  conditionScore?: number;
  ageScore?: number;
}

/**
 * Backend valuation factors format
 */
export interface BackendValuationFactors {
  location_score: number;
  size_score: number;
  amenities_score: number;
  market_demand: number;
  condition_score?: number;
  age_score?: number;
}

/**
 * Comparable property for valuation
 */
export interface ComparableProperty {
  id: string;
  title: string;
  address: string;
  price: number;
  soldDate?: string;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  similarity: number; // 0-1 score
}

/**
 * Backend comparable property format
 */
export interface BackendComparableProperty {
  id: string;
  title: string;
  address: string;
  price: number;
  sold_date?: string;
  bedrooms: number;
  bathrooms: number;
  area_sqm: number;
  similarity: number;
}

/**
 * Frontend valuation result
 */
export interface ValuationResult {
  id: string;
  propertyId: string;
  estimatedValue: number;
  currency: CurrencyCode;
  valueRange: ValueRange;
  confidenceScore: number; // 0-1
  accuracyRating: AccuracyRating;
  factors: ValuationFactors;
  marketTrend: MarketTrend;
  pricePerSqm: number;
  comparableProperties: number;
  comparables?: ComparableProperty[];
  validUntil: string;
  createdAt: string;
}

/**
 * Backend valuation result format
 */
export interface BackendValuationResult {
  id: string;
  property_id: string;
  estimated_value: number;
  currency: string;
  value_range: ValueRange;
  confidence_score: number;
  accuracy_rating: AccuracyRating;
  factors: BackendValuationFactors;
  market_trend: MarketTrend;
  price_per_sqm: number;
  comparable_properties: number;
  valid_until: string;
  created_at: string;
}

/**
 * Request valuation DTO
 */
export interface RequestValuationDto {
  propertyId: string;
}

/**
 * Quick valuation request (without existing property)
 */
export interface QuickValuationDto {
  propertyType: PropertyType;
  city: string;
  county: string;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  yearBuilt?: number;
  amenities?: string[];
}

/**
 * Backend quick valuation format
 */
export interface BackendQuickValuationDto {
  property_type: PropertyType;
  city: string;
  county: string;
  bedrooms: number;
  bathrooms: number;
  area_sqm: number;
  year_built?: number;
  amenities?: string[];
}

/**
 * Market trend data point
 */
export interface MarketTrendData {
  date: string;
  averagePrice: number;
  medianPrice: number;
  listingCount: number;
  salesCount: number;
}

/**
 * Neighborhood statistics
 */
export interface NeighborhoodStats {
  name: string;
  averagePrice: number;
  pricePerSqm: number;
  trend: MarketTrend;
  trendPercentage: number;
  listingCount: number;
  daysOnMarket: number;
}

/**
 * Accuracy rating labels
 */
export const ACCURACY_RATING_LABELS: Record<AccuracyRating, string> = {
  low: 'Low Confidence',
  medium: 'Medium Confidence',
  high: 'High Confidence',
};

/**
 * Market trend labels
 */
export const MARKET_TREND_LABELS: Record<MarketTrend, string> = {
  rising: 'Rising',
  stable: 'Stable',
  falling: 'Falling',
};

/**
 * Market trend colors
 */
export const MARKET_TREND_COLORS: Record<MarketTrend, string> = {
  rising: 'green',
  stable: 'blue',
  falling: 'red',
};
