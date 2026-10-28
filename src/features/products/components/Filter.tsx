
"use client";

import React from "react";
import {
  Button,
  Checkbox,
  Collapse,
  Divider,
  InputNumber,
  Tooltip,
  Typography,
} from "antd";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";

const { Title, Text } = Typography;

type FilterValues = {
  categories: string[];
  brands: string[];
  minPrice: number | null;
  maxPrice: number | null;
};

type FilterOption = {
  label: string;
  value: string;
};

type FilterProps = {
  categories?: FilterOption[];
  brands?: FilterOption[];
  onApply?: (filters: FilterValues) => void;
};

type LastChanged = {
  type: "categories" | "brands";
  value: string;
} | null;

const initialFilters: FilterValues = {
  categories: [],
  brands: [],
  minPrice: null,
  maxPrice: null,
};

function readFilters(params: URLSearchParams): FilterValues {
  const min = params.get("minPrice");
  const max = params.get("maxPrice");

  return {
    categories: params.getAll("category"),
    brands: params.getAll("brand"),
    minPrice:
      min !== null && min.trim() !== "" && Number.isFinite(Number(min))
        ? Number(min)
        : null,
    maxPrice:
      max !== null && max.trim() !== "" && Number.isFinite(Number(max))
        ? Number(max)
        : null,
  };
}

export default function Filter({
  categories = [],
  brands = [],
  onApply,
}: FilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  // URL dagi filtrlar o'zgarganda yangi boshlang'ich qiymatlarni hisoblaymiz.
  const urlFilters = React.useMemo(
    () => readFilters(new URLSearchParams(searchParamsString)),
    [searchParamsString]
  );

  // Foydalanuvchi joriy sahifada o'zgartirgan filtrlar.
  const [draftFilters, setDraftFilters] =
    React.useState<FilterValues | null>(null);

  const [lastChanged, setLastChanged] =
    React.useState<LastChanged>(null);

  // URL o'zgargan bo'lsa, draft qiymatlar eskirgan hisoblanadi.
  const filters = draftFilters ?? urlFilters;

  const priceError =
    filters.minPrice !== null &&
    filters.maxPrice !== null &&
    filters.minPrice > filters.maxPrice;

  const updateFilter = <K extends keyof FilterValues>(
    key: K,
    value: FilterValues[K]
  ) => {
    const currentFilters = draftFilters ?? urlFilters;

    if (key === "categories" || key === "brands") {
      const selectedValues = value as string[];
      const previousValues = currentFilters[key] as string[];

      const addedValue = selectedValues.find(
        (item) => !previousValues.includes(item)
      );

      if (addedValue) {
        setLastChanged({
          type: key,
          value: addedValue,
        });
      } else {
        setLastChanged((previous) => {
          if (!previous) return null;

          if (
            previous.type === key &&
            !selectedValues.includes(previous.value)
          ) {
            const remainingValue = selectedValues.at(-1);

            return remainingValue
              ? { type: key, value: remainingValue }
              : null;
          }

          return previous;
        });
      }
    }

    setDraftFilters({
      ...currentFilters,
      [key]: value,
    });
  };

  const updateUrl = (values: FilterValues) => {
    const params = new URLSearchParams(searchParamsString);

    params.delete("category");
    params.delete("brand");
    params.delete("minPrice");
    params.delete("maxPrice");

    values.categories.forEach((category) => {
      params.append("category", category);
    });

    values.brands.forEach((brand) => {
      params.append("brand", brand);
    });

    if (values.minPrice !== null) {
      params.set("minPrice", String(values.minPrice));
    }

    if (values.maxPrice !== null) {
      params.set("maxPrice", String(values.maxPrice));
    }

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    router.replace(url, { scroll: false });
  };

  const handleApply = () => {
    if (priceError) return;

    updateUrl(filters);
    onApply?.(filters);
    setDraftFilters(null);
    setLastChanged(null);
  };

  const resetFilters = () => {
    setDraftFilters(null);
    setLastChanged(null);
    updateUrl(initialFilters);
    onApply?.(initialFilters);
  };

  const renderOptions = (
    options: FilterOption[],
    selected: string[],
    type: "categories" | "brands",
    onChange: (values: string[]) => void
  ) => (
    <div className="max-h-[200px] overflow-y-auto overflow-x-hidden pr-2">
      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = selected.includes(option.value);
          const showApply =
            isSelected &&
            lastChanged?.type === type &&
            lastChanged.value === option.value;

          return (
            <div
              key={option.value}
              className="flex items-center justify-between gap-2"
            >
              {type === "categories" && (
                <Link
                  className={`text-inherit ${
                    pathname.includes(option.value) ? "font-bold" : ""
                  }`}
                  href={`/products/${option.value}`}
                >
                  {option.label}
                </Link>
              )}

              {type === "brands" && (
                <Checkbox
                  checked={isSelected}
                  onChange={(event) => {
                    const checked = event.target.checked;

                    const nextValues = checked
                      ? [...selected, option.value]
                      : selected.filter(
                          (value) => value !== option.value
                        );

                    onChange(nextValues);

                    if (!checked) {
                      const currentFilters = draftFilters ?? urlFilters;
                      const nextFilters: FilterValues = {
                        ...currentFilters,
                        [type]: nextValues,
                      };

                      updateUrl(nextFilters);
                      onApply?.(nextFilters);
                      setDraftFilters(null);
                      setLastChanged(null);
                    }
                  }}
                >
                  {option.label}
                </Checkbox>
              )}

              {showApply && (
                <Tooltip
                  title="Barcha tanlangan filtrlarni qo‘llash"
                  placement="right"
                  open
                >
                  <Button
                    type="primary"
                    size="small"
                    disabled={priceError}
                    onClick={handleApply}
                  >
                    Qo‘llash
                  </Button>
                </Tooltip>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const collapseItems = [
    {
      key: "categories",
      label: (
        <span className="font-semibold text-gray-800">
          Kategoriyalar
        </span>
      ),
      children: renderOptions(
        categories,
        filters.categories,
        "categories",
        (values) => updateFilter("categories", values)
      ),
    },
    {
      key: "brands",
      label: (
        <span className="font-semibold text-gray-800">
          Brendlar
        </span>
      ),
      children: renderOptions(
        brands,
        filters.brands,
        "brands",
        (values) => updateFilter("brands", values)
      ),
    },
  ];

  return (
    <aside className="w-full min-w-0 max-w-[300px] rounded-lg border border-gray-200 bg-white px-3 py-4">
      <div className="flex items-center justify-between">
        <Title level={5} className="!mb-0">
          Filter
        </Title>

        <Button
          type="link"
          size="small"
          onClick={resetFilters}
          className="!px-0"
        >
          Tozalash
        </Button>
      </div>

      <Divider className="!my-3" />

      <Collapse
        ghost
        defaultActiveKey={["categories", "brands"]}
        items={collapseItems}
        className="[&_.ant-collapse-header]:!px-0 [&_.ant-collapse-content-box]:!px-0 [&_.ant-collapse-content-box]:!pt-1"
      />

      <Divider className="!my-3" />

      <section>
        <Title level={5} className="!mb-3">
          Narx oralig‘i
        </Title>

        <div className="grid grid-cols-2 gap-2">
          <div className="min-w-0">
            <Text type="secondary" className="mb-1 block text-xs">
              Min narx
            </Text>

            <InputNumber
              className="!w-full"
              placeholder="0"
              min={0}
              value={filters.minPrice}
              onChange={(value) =>
                updateFilter(
                  "minPrice",
                  typeof value === "number" ? value : null
                )
              }
              formatter={(value) =>
                value === undefined || value === null
                  ? ""
                  : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
              }
              parser={(value) =>
                Number((value ?? "").replace(/\s/g, "") || 0)
              }
            />
          </div>

          <div className="min-w-0">
            <Text type="secondary" className="mb-1 block text-xs">
              Max narx
            </Text>

            <InputNumber
              className="!w-full"
              placeholder="Cheksiz"
              min={0}
              value={filters.maxPrice}
              onChange={(value) =>
                updateFilter(
                  "maxPrice",
                  typeof value === "number" ? value : null
                )
              }
              formatter={(value) =>
                value === undefined || value === null
                  ? ""
                  : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
              }
              parser={(value) =>
                Number((value ?? "").replace(/\s/g, "") || 0)
              }
            />
          </div>
        </div>

        {priceError && (
          <Text type="danger" className="mt-2 block text-xs">
            Min narx max narxdan katta bo‘lishi mumkin emas.
          </Text>
        )}

        {(filters.minPrice !== null ||
          filters.maxPrice !== null) && (
          <Button
            type="primary"
            size="small"
            className="!mt-3"
            disabled={priceError}
            onClick={handleApply}
          >
            Narxni qo‘llash
          </Button>
        )}
      </section>
    </aside>
  );
}
