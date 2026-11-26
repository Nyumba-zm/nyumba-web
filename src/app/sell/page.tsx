"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthGuard } from "@/components/auth";
import { useCreateListing } from "@/lib/hooks";
import { getErrorMessage } from "@/lib/errors/apiError";
import { provinceForCity, ZAMBIAN_PROVINCES } from "@/lib/constants/locations";
import {
  createPropertySchema,
  type CreatePropertyFormInput,
  type CreatePropertyFormData,
} from "@/lib/validations";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PROPERTY_TYPE_LABELS, PROPERTY_TYPES } from "@/types/property";
import { DEFAULT_CURRENCY } from "@/types/api";

/** Backend limit for POST /properties/{id}/images. */
const MAX_PHOTOS = 10;
const ACCEPTED_IMAGE_TYPES = "image/jpeg,image/png,image/webp";

const selectClassName =
  "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500";

function SellPageContent() {
  const router = useRouter();
  const { addToast } = useToast();
  const createListing = useCreateListing();
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoError, setPhotoError] = useState<string>();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CreatePropertyFormInput, unknown, CreatePropertyFormData>({
    resolver: zodResolver(createPropertySchema),
    defaultValues: {
      propertyType: "house",
      listingType: "rent",
      isNegotiable: true,
      bedrooms: 2,
      bathrooms: 1,
      city: "Lusaka",
      province: "Lusaka",
    },
  });

  const listingType = useWatch({ control, name: "listingType" });

  const handleCityBlur = () => {
    const province = provinceForCity(getValues("city"));
    if (province) setValue("province", province, { shouldValidate: true });
  };

  const handlePhotosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    if (selected.length > MAX_PHOTOS) {
      setPhotoError(`You can upload up to ${MAX_PHOTOS} photos.`);
      return;
    }
    setPhotoError(undefined);
    setPhotos(selected);
  };

  const onSubmit = (data: CreatePropertyFormData) => {
    if (photos.length === 0) {
      setPhotoError("Add at least one photo. Listings are published with photos.");
      return;
    }
    createListing.mutate(
      {
        data: { ...data, currency: DEFAULT_CURRENCY, amenities: [] },
        images: photos,
      },
      {
        onSuccess: ({ propertyId }) => {
          addToast("Your listing is live!", "success");
          router.push(`/properties/${propertyId}`);
        },
        onError: (error) => {
          addToast(
            `${getErrorMessage(error)} If the listing was created, it is saved as a draft in My Properties.`,
            "error"
          );
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-16" style={{ backgroundColor: "#0f766e" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#ffffff" }}
          >
            List Your Property
          </h1>
          <p className="text-lg md:text-xl" style={{ color: "#ffffff" }}>
            Reach thousands of potential buyers and renters
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why List with Nyumba?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary-100 text-primary-500 rounded-full p-4 inline-block mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Wide Reach</h3>
              <p className="text-gray-600 text-sm">
                Connect with thousands of potential buyers
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 text-primary-500 rounded-full p-4 inline-block mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Secure</h3>
              <p className="text-gray-600 text-sm">
                Safe and verified transactions
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 text-primary-500 rounded-full p-4 inline-block mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Easy Process</h3>
              <p className="text-gray-600 text-sm">
                Simple listing in just a few steps
              </p>
            </div>
          </div>
        </div>

        {/* Property Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Property Details
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Property Title *
              </label>
              <Input
                id="title"
                {...register("title")}
                placeholder="e.g., Modern 3 Bedroom House in Kabulonga"
                error={errors.title?.message}
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                {...register("description")}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Describe your property in detail..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Property Type */}
              <div>
                <label
                  htmlFor="propertyType"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Property Type *
                </label>
                <select
                  id="propertyType"
                  {...register("propertyType")}
                  className={selectClassName}
                >
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {PROPERTY_TYPE_LABELS[type]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Listing Type */}
              <div>
                <label
                  htmlFor="listingType"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Listing Type *
                </label>
                <select
                  id="listingType"
                  {...register("listingType")}
                  className={selectClassName}
                >
                  <option value="rent">For Rent</option>
                  <option value="sale">For Sale</option>
                </select>
              </div>
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Price (ZMW) {listingType === "rent" ? "per month" : ""} *
              </label>
              <Input
                id="price"
                type="number"
                {...register("price", { valueAsNumber: true })}
                placeholder={listingType === "rent" ? "e.g., 8500" : "e.g., 2500000"}
                error={errors.price?.message}
              />
              <label className="mt-3 flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" {...register("isNegotiable")} className="h-4 w-4" />
                Price is negotiable
              </label>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <Input
                  id="street"
                  {...register("street")}
                  placeholder="e.g., 12 Kabulonga Road"
                  error={errors.street?.message}
                />
              </div>
              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                  Area / Neighbourhood
                </label>
                <Input
                  id="area"
                  {...register("area")}
                  placeholder="e.g., Kabulonga"
                  error={errors.area?.message}
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City / Town *
                </label>
                <Input
                  id="city"
                  {...register("city", { onBlur: handleCityBlur })}
                  placeholder="e.g., Lusaka"
                  error={errors.city?.message}
                />
              </div>
              <div>
                <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-2">
                  Province *
                </label>
                <select id="province" {...register("province")} className={selectClassName}>
                  {ZAMBIAN_PROVINCES.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
                {errors.province && (
                  <p className="mt-1 text-sm text-red-600">{errors.province.message}</p>
                )}
              </div>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="bedrooms"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Bedrooms *
                </label>
                <Input
                  id="bedrooms"
                  type="number"
                  {...register("bedrooms", { valueAsNumber: true })}
                  error={errors.bedrooms?.message}
                />
              </div>
              <div>
                <label
                  htmlFor="bathrooms"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Bathrooms *
                </label>
                <Input
                  id="bathrooms"
                  type="number"
                  {...register("bathrooms", { valueAsNumber: true })}
                  error={errors.bathrooms?.message}
                />
              </div>
              <div>
                <label
                  htmlFor="areaSqm"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Area (sq meters) *
                </label>
                <Input
                  id="areaSqm"
                  type="number"
                  {...register("areaSqm", { valueAsNumber: true })}
                  placeholder="e.g., 250"
                  error={errors.areaSqm?.message}
                />
              </div>
            </div>

            {/* Photos */}
            <div>
              <label htmlFor="photos" className="block text-sm font-medium text-gray-700 mb-2">
                Photos * <span className="font-normal text-gray-500">(up to {MAX_PHOTOS})</span>
              </label>
              <input
                id="photos"
                type="file"
                accept={ACCEPTED_IMAGE_TYPES}
                multiple
                onChange={handlePhotosChange}
                className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:font-medium file:text-primary-700"
              />
              {photos.length > 0 && (
                <p className="mt-1 text-sm text-gray-600">
                  {photos.length} photo{photos.length === 1 ? "" : "s"} selected
                </p>
              )}
              {photoError && <p className="mt-1 text-sm text-red-600">{photoError}</p>}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={createListing.isPending}
            >
              {createListing.isPending ? "Publishing listing..." : "Publish Listing"}
            </Button>
          </form>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Your listing goes live as soon as it is published. Nyumba never charges viewing
            fees, and neither should you.
          </p>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/properties"
            className="text-primary-500 hover:text-primary-600 font-medium"
          >
            ← Back to Properties
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SellPage() {
  return (
    <AuthGuard>
      <SellPageContent />
    </AuthGuard>
  );
}
