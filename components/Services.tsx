import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

const ekovibeServices = [
  {
    title: "Ekovibe Concierge",
    subtitle: "Lifestyle Management",
    description:
      "The white-glove service department handling high-pressure requests, airport fast-tracking, and private jet charters.",
    features: ["Protocol & Logistics", "Personal Shopping", "Travel Planning"],
  },
  {
    title: "Ekovibe Reservations",
    subtitle: "Nightlife & Dining",
    description:
      "The gatekeeper to the city's social heart, offering real-time table bookings and VIP placements in exclusive clubs.",
    features: ["Elite Access", "Nightlife Curation", "Prestige Partnerships"],
  },
  {
    title: "Ekovibe Ticketing",
    subtitle: "Experiences",
    description:
      "A digital portal for premium event access, featuring member-only tickets and seamless QR-based entry.",
    features: ["Curation", "Exclusive Inventory", "Tech-Driven Entry"],
  },
  {
    title: "Ekovibe Shop",
    subtitle: "E-Commerce",
    description:
      "The physical manifestation of the brand's aesthetic, featuring limited-edition 'Vibe-Wear' and luxury goods.",
    features: ["Vibe-Wear", "Curated Marketplace", "Membership Perks"],
  },
  {
    title: "Ekovibe Media",
    subtitle: "Content House",
    description:
      "The storyteller fueling the culture through high-fidelity video tours and digital journalism.",
    features: ["Digital Content", "The Pulse", "Brand Advertising"],
  },
];

export const Services = () => {
  return (
    <div className="bg-white py-10">
      <div className="container">
        <h2 className="font-semibold text-yellow text-center text-3xl md:text-4xl">
          Our Services
        </h2>
        <div className="grid grid-cols-1 mt-6 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ekovibeServices.map((service, index) => (
            <Card
              key={index}
              className="border-none shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="p-8">
                <p className="text-yellow font-semibold text-xs uppercase tracking-widest mb-1.5">
                  {service.subtitle}
                </p>
                <h3 className="text-2xl font-bold text-black mb-2.5 uppercase">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="text-xs font-medium flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-yellow rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
