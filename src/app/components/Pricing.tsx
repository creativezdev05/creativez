'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

interface Plan {
  name: string;
  price: string;
  features: string[];
}

const plans: Plan[] = [
  {
    name: 'Standard',
    price: '$1500',
    features: [
      'Fast design & dev, built for startups',
      'Dedicated creative team',
      'Average 2–3 day turnaround',
      'Ongoing design-to-build support',
      'Fast design & dev, built for startups',
    ],
  },
  {
    name: 'Professional',
    price: '$5000',
    features: [
      'Fast design & dev, built for startups',
      'Dedicated creative team',
      'Average 2–3 day turnaround',
      'Ongoing design-to-build support',
      'Fast design & dev, built for startups',
    ],
  },
];

export default function Pricing() {
  return (
    <section id="Price" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1500px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center text-5xl font-semibold text-heading md:text-7xl"
        >
          Pricing
        </motion.h2>

        <div className="mx-auto grid max-w-[1095px] grid-cols-1 gap-8 md:grid-cols-2">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-[2.5rem] bg-surface py-12"
            >
              <div className="flex flex-col items-start gap-8 px-8 md:px-11">
                <h6 className="text-xl font-semibold text-[#3d4048]">{plan.name}</h6>
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-semibold text-primary md:text-5xl">
                    {plan.price}
                  </span>
                  <p className="pt-2 text-base text-[#57576b]">/ Per Project</p>
                </div>
              </div>

              <div className="relative my-10 flex items-center justify-center gap-4 px-8 md:px-11">
                <span className="h-px w-full max-w-[163px] bg-gradient-to-r from-divider to-surface opacity-30" />
                <span className="shrink-0 text-lg font-semibold text-[#57576b]">
                  Included Features
                </span>
                <span className="h-px w-full max-w-[163px] bg-gradient-to-l from-divider to-surface opacity-30" />
              </div>

              <div className="flex flex-col gap-10 px-8 md:px-11">
                <ul className="flex flex-col gap-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-4">
                      <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-4 w-4 text-primary" />
                      </span>
                      <span className="text-lg font-medium text-[#57576b]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#Email"
                  className="group relative inline-flex w-fit items-center gap-3 overflow-hidden rounded-full bg-gradient-to-br from-primary-light to-primary-dark px-7 py-4 text-sm font-semibold text-[#FAFAFA] transition-colors hover:bg-dark hover:bg-none"
                >
                  Get started
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="absolute inset-0 -z-10 rounded-full opacity-0 shadow-[0_0_48px_rgba(195,84,229,0.45)] transition-opacity duration-300 group-hover:opacity-100" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
