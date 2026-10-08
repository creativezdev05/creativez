export interface ServicePackage {
  name: string;
  price?: string;
  features: string[];
}

export interface ServiceDetail {
  heroImage: string;
  heading: string;
  tags: string[];
  whatIncludes: string[];
  packages: ServicePackage[];
}

export interface Service {
  slug: string;
  title: string;
  order: number;
  thumbnail: string;
  description: string;
  detail: ServiceDetail;
}
