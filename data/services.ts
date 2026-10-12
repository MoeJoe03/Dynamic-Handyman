export interface ServiceItem {
  id: string;
  ref: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  complianceSpec: string;
  turnaroundEstimate: string;
  subServices: string[];
  keyDeliverables: string[];
  images: {
    url: string;
    alt: string;
  }[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "electrical",
    ref: "01",
    title: "Electrical Repairs and Certificates of Compliance",
    subtitle: "Certified Distribution & Safe Power Management",
    badge: "Certified",
    complianceSpec: "SANS 10142-1 Accredited Compliance",
    turnaroundEstimate: "Same-Day Emergency / 24-48h Project SLA",
    description: "Electrical repairs, upgrades and fault finding for homes, offices and commercial properties, including DB board work, lighting and power points.",
    subServices: [
      "DB board upgrades & rewiring",
      "Fault diagnostics & tripping",
      "Compliance certificates (COC)",
      "Generator & inverter changeovers",
      "Light fittings & downlights",
      "Plug points & isolators",
      "Surge protection"
    ],
    keyDeliverables: [
      "High-voltage test certification & resistance verification",
      "Clean DIN-rail circuit breaker layout and terminal torque checking",
      "Dedicated surge protection device (SPD) installation",
      "Official Wireman's License stamped Electrical Certificate of Compliance"
    ],
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlAncPdCi5h4looGaNK6i0RNxit4Z-G83zVvVfDeYyynUQLgv-wWr6Pu5mEuSPpkO5T7CnxMZxFOJVgqmjPjs_a2Z2RAv9LjXgnXdGAXlGzqGoa1Y_M-X-B_YbEfQnmx88Y-aBCFdLfuAR_dOEHNstFr_ncJFuMTqD57noyGGeYv50u5bNYBYuOhqK2Cd5fZ-1qWp4pEy50ozkDZ47azkP3Jw4Fhn3jrW8ElV86G13d2LYULs3Vzzc7g",
        alt: "Electrical DB Board Works & Wiring"
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuroIwgygiqhg0GpMdyZbaWlmYwILupLltCfXOBPOyROroqkyotDoDZ57kcxgDWRMD6LJEA-y6L5itLjWcuR21a8u-xm3VFbv2ZkUD6NYl-hqZ-Vqo5VqP5i2IZxZAthN10PhVC0wjhJ-VbSHrMwjxvyoSOZdWFRh6zDJFKyuBaSyQLu-CcmF15W3zntT0DsFajMP9lz4K-l5Tx9ZWo1wH5WGgNeWmPxBk7aWTAqx7iaAbYOrIcpNfmQ",
        alt: "Distribution Board Sub-Circuit Wiring"
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMZZfvYj_ogC5PHef0pfHlXLvLzpPTh-RMe90qSLqs4X9KVxWpGb-A6pnZAblexERrNdb1071916ossFFyR8nCya2G-g-A88PJZL10Ll7H-zEAAtFnpSMg8emwJ-Ut4Qe77-ExeaPX8jOVIYzIZPOgK4Pf9dY72OPMbf36GmZLOxJrwPT8dQbwt_ufRzMrlbsXzbXV2kM65P0p4aLdJfZvr-ppHZcuyxcOk0EXXvao_O09Hu49gEKmog",
        alt: "Commercial Facility Electrical Infrastructure"
      },
      {
        url: "/images/services/electrical-fourth.webp",
        alt: "Illustrative image of an electrician working on a distribution board"
      }
    ]
  },
  {
    id: "painting",
    ref: "02",
    title: "Painting, Roof Coatings and Damp-Proofing",
    subtitle: "High-Durability Architectural Coating Systems",
    badge: "Architectural Coating",
    complianceSpec: "Master Prep & UV Weather-Seal Warranty",
    turnaroundEstimate: "2 - 5 Days Based on Square Meterage",
    description: "Interior and exterior painting, roof coatings, crack repairs and damp-proofing for homes, offices and commercial properties.",
    subServices: [
      "Interior walls & ceilings",
      "Exterior masonry & weather-seal",
      "Roof spray coatings & repairs",
      "Damp-proofing & crack filling",
      "Doors, frames & trims",
      "High-pressure wash prep",
      "Protective industrial enamels"
    ],
    keyDeliverables: [
      "Substrate preparation with high-pressure deep cleaning and anti-fungal wash",
      "Elastomeric crack bridging and plaster bonding seal coat",
      "Dual topcoats with UV-reflective pure acrylic pigments",
      "Clean edge masking and complete post-job site cleanup"
    ],
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlToBl-T_N0crEe1z9CiGxVnnpaGVcBexGXKDm19s998PWYLgWGLs2edAN_JiH6UqsuTje_KgrQa0EhZtwfJxePgY-MZ-t8ge5T_L9gF-Fd8NQF5qdNNNYMwJf9rjRPRTA8IqskdQfkRDC42zexfhUhXXuNK9PHOPETVb4iRnTsVD4zB2Gg1r2qDAT7bvDdEO_dpbXyC3-aaeIb7-jLKZUj-FuHyVdo69xs9j1Jv5NrdnmZ7OFAKGNGg",
        alt: "Interior Wall Painting and Preparation"
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhn1sUA6cb-u7_UcSjwVtj8mYU_9j9n2KM-whcFNotHerF1_AL4BDn6l5hxIcs7BnakIhhjbw-rjNRkdaigAzx8BCN0nldDNdOLdJDM8-HkAMDMkgyYgXK9E2UZ-FbxS3vGj3n9DAcq0vRFFpMC5-JovMRR_Y7C9oFUrPv0BuQf2FPXmvyW1ZDyoNaWWPG4nx0iT75PQIPYG6D_WhOp1dYapgfiYYyFYaOqAiTGkKC3w4iw6ZqKl7diw",
        alt: "Exterior Modern Property Painting"
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSl_WQz4_BUPFnnPx43a9J3C9qQyxe_oSjrch_YwfFQLrWmqKXnAY2Y1iqcCe_1n6mP7spblWkDZ9qKySWszfAhObjFdFc236E_hjyfy3O35LeRd21Zdosg-AhcP-A-XCpHb0iCgk7hk6GhRxlh7Ucm5xdGM2vt_lGZ7nH3EVQAc6WGJ841DM6dh-blVhAdTfXhvYUxSv6ae6NO_8IbFdXGZ-j5XD5CcepMsyOxK6TvpYi1hWfcVZAIw",
        alt: "Architectural Exterior Facade Coating"
      },
      {
        url: "/images/services/painting-fourth.webp",
        alt: "Illustrative image of exterior painting and wall preparation"
      }
    ]
  },
  {
    id: "carpentry",
    ref: "03",
    title: "Carpentry, Cupboards, Doors and Ceilings",
    subtitle: "Precision Joinery, Custom Cabinetry & Architectural Woodwork",
    badge: "Precision Joinery",
    complianceSpec: "Fine Millwork Tolerances (< 1mm)",
    turnaroundEstimate: "3 - 7 Working Days Fabrication & Fit",
    description: "Practical carpentry and joinery services for repairs, installations and improvements throughout the property.",
    subServices: [
      "Built-in bedroom cupboards",
      "Cabinet hinge & handle fixing",
      "Door hanging & lock fitting",
      "Suspended & rhino ceilings",
      "Skirting & cornice installation",
      "Kitchen repairs & modifications",
      "Timber partitions & shelving"
    ],
    keyDeliverables: [
      "Laser-leveled frame alignment and custom wall scribing",
      "Heavy-duty soft-close European hardware installation",
      "Moisture-resistant MDF/solid timber edging and trim finishing",
      "Smooth acoustic and thermal suspended ceiling integration"
    ],
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9RdtOlpdexj9r3xKW75WlHCMirVh1webhKQEr1NLXh3f0RlUj0TIkgVgPVAtVUWM_lZT1Vx9nNRr25lLByQj9IpmqHagTzb2fzbeJVw-Js_MjVj-lsyLdU7PbeBz-jNVjvIzwnh_Utghii4kGmiUNVgLJFt287GjilYNKF9slmMYL9RjwcttnfT71jqXC1gNjXBpT-c-RgxOUnTqouI1ogTpbo2--2sOcpFyju5h-7nUPqb6nqulJjQ",
        alt: "Custom Joinery Handcraft & Timber Fitting"
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBasPoBYZhDUxXh7WQ_fetvQCv_cJjopSJmRZVDPCTSfVYpRbwrmCvN2pJTXSYjCw2Xg8430yYPcPdoPgHReaeeyPYNYgPnfW0ye7aNQ6E3a3DGvgdRKidX33N3okw8DdeCxTxLGFnegSQrA6nDRW2qcxOwIbCmNtwsCIYPlxC7_Cex7L8H4jgWnwaCW3xSC4H7fQkrxekEQcDB11n6S5wrsWveFvn-Ef-zzmZ13OaP0wGgbtoKQgjzvQ",
        alt: "Built-In Cupboards and Shelving Installation"
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5OjL5fFG3bg8g9TSK_Tl-8tkssi-4cXBBC9mSrji4Fggqt6mqoCCbt4j0-WHOTL50ikJK2TjB_9lKCnOgDsmTVd7Itph68suVGkjC_328q4ST4o9ftphAGsbj5eD3k1-_X8asbinHYdnRg2Ieip4aNeNM9Km0sgwFXnNZn71sSoHWCTL1xCsfnBNJdpiKDlgjf0MvHeRYWie3KCpbdV3rFGUWJgTB4iXMYIzCrR7xyoLTKZnBvhwKeA",
        alt: "Modern Architectural Cabinetry and Wardrobe"
      },
      {
        url: "/images/services/carpentry-fourth.webp",
        alt: "Illustrative image of built-in cupboard carpentry"
      }
    ]
  },
  {
    id: "plumbing",
    ref: "04",
    title: "Plumbing",
    subtitle: "Hydraulic Systems, Sanitaryware & Geyser Maintenance",
    badge: "Hydraulics",
    complianceSpec: "SANS 10252 Plumbing Standards",
    turnaroundEstimate: "Same-Day Leaks / 24h Geyser Replacement",
    description: "Plumbing repairs and maintenance for bathrooms, kitchens, geysers, pipes and drainage systems.",
    subServices: [
      "Burst pipe & leak repairs",
      "Geyser replacement & thermostats",
      "Pressure control valve adjustments",
      "Taps, mixers & shower sets",
      "Toilet cisterns & waste lines",
      "Drain unblocking & traps",
      "Kitchenette rough-ins"
    ],
    keyDeliverables: [
      "Pressure-tested joints with certified copper and multi-layer PEX piping",
      "Geyser drip tray, vacuum breakers, and overflow compliance setup",
      "Acoustic pipe dampening and secure structural bracket anchors",
      "Clean sanitary sealants with anti-microbial waterproofing"
    ],
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWjcarXKsl3O6UiJWxxL93fcrdvQPy5mB59SXy84-koWMYPu7Ph7W-l0t7JBozPyWcOniH8fVDd9A735tO-o1HQDgaYtHsQudA5mY_u2O4xeQ804YN0Ny0-SNLHAFVzU3N4uo3_AGE1pnatD_k-7wQEKJlGgismUGZSCSweMgwql6CoPxM30ozdG5yNYXv0yF-cdVTkbHmaCbUE_xHCTzT_vvCN3UCS3Umd0MZhi2-GnPnHxH5mbBvhA",
        alt: "Luxury Bathroom Plumbing & Sanitaryware"
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCO-_GC4xQ98VL-A7nMILDQ9-Aaldyr0nSWQMcru3YjjqDDwxojBmdEUOm4R0iSEU5KBHzZj27rUpSNyviG6mfjuDPFzCMJnrAlDhMFLrstKjxiJGAg8gX6iO7_aZF0PYqiucuuQ7V05RldgFrJGq4aPa3emip7JzqyYlq924kfvr-3LmVJQrTCk8Z_otxVs754GcSx1OOcfb_ik2nI_hkgPxSaP0XAu645-JC1tcC_SukN8h-fPRKm0w",
        alt: "Corporate Facility Pipe Infrastructure"
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMZZfvYj_ogC5PHef0pfHlXLvLzpPTh-RMe90qSLqs4X9KVxWpGb-A6pnZAblexERrNdb1071916ossFFyR8nCya2G-g-A88PJZL10Ll7H-zEAAtFnpSMg8emwJ-Ut4Qe77-ExeaPX8jOVIYzIZPOgK4Pf9dY72OPMbf36GmZLOxJrwPT8dQbwt_ufRzMrlbsXzbXV2kM65P0p4aLdJfZvr-ppHZcuyxcOk0EXXvao_O09Hu49gEKmog",
        alt: "Precision Structural Plumbing and Fixture Fitting"
      },
      {
        url: "/images/services/plumbing-fourth.webp",
        alt: "Illustrative image of bathroom pipe repairs"
      }
    ]
  },
  {
    id: "palisades",
    ref: "05",
    title: "Palisade Fencing, Gates and Carports",
    subtitle: "Custom Steel Fabrication, Boundary Security & Carports",
    badge: "Steel Fabrication",
    complianceSpec: "Structural Steel Welding & Heavy Foundation Spec",
    turnaroundEstimate: "3 - 7 Working Days Site Installation",
    description: "Steel fabrication and installation for boundary security, vehicle protection and property improvements.",
    subServices: [
      "Steel palisade boundary fencing",
      "Pedestrian & driveway sliding gates",
      "Cantilever & 4-post carports",
      "On-site welding & structural repairs",
      "Anti-rust primer & protective enamel",
      "Corrugated & IBR roof sheeting",
      "Gate track & roller replacement"
    ],
    keyDeliverables: [
      "Heavy-gauge hot-rolled structural steel tubing and gusset plates",
      "Reinforced deep concrete foundation footings",
      "Zinc chromate anti-rust primer with dual industrial enamel topcoats",
      "Engineered storm-water gutter downspout runoff integration"
    ],
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWBax_T46uynpNADscXDGNia53Vtqt3pDjUalC-YisLuULknn1B90Koezbct_9d1CQTMsgPGcZeV4vymQHc6C5YAk9OTLt12X49yKeFuVC8hRqcNjBs1YFZ1Zf440cOvK0Ktuvsjy4LWfilLn3g0XBglfqc-l-R8bLP57-hQyAlbCaGLEPLIK4rAM_HIIdvnGpTkYX_m-Shw8JtnQ8IUr9Q4KvhmztTLBh33a5HQCKVt05tNFuDDlxVw",
        alt: "Custom Steel Carport and Modern Framing"
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhn1sUA6cb-u7_UcSjwVtj8mYU_9j9n2KM-whcFNotHerF1_AL4BDn6l5hxIcs7BnakIhhjbw-rjNRkdaigAzx8BCN0nldDNdOLdJDM8-HkAMDMkgyYgXK9E2UZ-FbxS3vGj3n9DAcq0vRFFpMC5-JovMRR_Y7C9oFUrPv0BuQf2FPXmvyW1ZDyoNaWWPG4nx0iT75PQIPYG6D_WhOp1dYapgfiYYyFYaOqAiTGkKC3w4iw6ZqKl7diw",
        alt: "Steel Boundary & Perimeter Integration"
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoAhZZMUpgtzUlw2rH5D24DlgUltO0jio6axjNlyuj1ar5ae7qYIyQCfcYv-QYwuUJRcbfNHGTTPLZr1jU3c12rQAe-zZNS_bTKj2jBzpqPpfeOfAfFWRFwaBO3WvDiZbhWEqJ2ps9idODDcRsTx1_CZsQTqOz1-7dxz_hlQ7y4JCC_xmgdBvBCdFIzVD0sFlaa7YvWXbutFnX8yzrz00CACU-kVH2BHKAifudggIdC-wqhcSgbjZo-A",
        alt: "Structural Frame Alteration and Site Fabrication"
      },
      {
        url: "/images/services/palisades-fourth.webp",
        alt: "Illustrative image of a steel gate and carport installation"
      }
    ]
  },
  {
    id: "paving",
    ref: "06",
    title: "Paving",
    subtitle: "Engineered Driveway Paving, Kerbing & Structural Alterations",
    badge: "Structural Alterations",
    complianceSpec: "Compacted Sub-Base & Load-Bearing Standards",
    turnaroundEstimate: "4 - 8 Days Site Preparation & Laying",
    description: "Paving, masonry repairs and minor property alterations for homes, businesses and outdoor areas.",
    subServices: [
      "Driveway & walkway paving",
      "Paving repairs & sunken patch re-leveling",
      "Kerbing, channels & drainage slopes",
      "Plastering, screeding & masonry repairs",
      "High-pressure sealing & weed barrier"
    ],
    keyDeliverables: [
      "Heavy soil compaction with mechanical wacker plate foundation",
      "Layered river sand bed with exact laser-leveled drainage fall",
      "Precision diamond-blade cut border edging and cement haunching",
      "Joint grouting with silica sand and protective weather seal"
    ],
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhn1sUA6cb-u7_UcSjwVtj8mYU_9j9n2KM-whcFNotHerF1_AL4BDn6l5hxIcs7BnakIhhjbw-rjNRkdaigAzx8BCN0nldDNdOLdJDM8-HkAMDMkgyYgXK9E2UZ-FbxS3vGj3n9DAcq0vRFFpMC5-JovMRR_Y7C9oFUrPv0BuQf2FPXmvyW1ZDyoNaWWPG4nx0iT75PQIPYG6D_WhOp1dYapgfiYYyFYaOqAiTGkKC3w4iw6ZqKl7diw",
        alt: "Driveway Paving and Exterior Finish"
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoAhZZMUpgtzUlw2rH5D24DlgUltO0jio6axjNlyuj1ar5ae7qYIyQCfcYv-QYwuUJRcbfNHGTTPLZr1jU3c12rQAe-zZNS_bTKj2jBzpqPpfeOfAfFWRFwaBO3WvDiZbhWEqJ2ps9idODDcRsTx1_CZsQTqOz1-7dxz_hlQ7y4JCC_xmgdBvBCdFIzVD0sFlaa7YvWXbutFnX8yzrz00CACU-kVH2BHKAifudggIdC-wqhcSgbjZo-A",
        alt: "Commercial Office Alterations & Structural Framing"
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-R9slRj8pHriM1qJRCenS2nTSqmSNIFOVWRtT0xQc1oAi428N7wPN2Shqed0pKdQqO_CPoHvu6CwulsjUHfLlX9rBQpqJOh0PAZV6QTxsLqCsDeFg17xH-jPETXzG170dLWk9Vhdt4_QLfWu0PDviYFc0K3SqLug6DHJeD2VzNy3Os0J7qL1ALpCJRWksmLqLIu2kUx-DglPvB9dRvVxegx7SawZWXz5_wdQeosiCVMp8BLMLp1NMEw",
        alt: "Aluminium Glazing & Window Fitting"
      },
      {
        url: "/images/services/paving-fourth.webp",
        alt: "Illustrative image of interlocking driveway paving installation"
      }
    ]
  },
  {
    id: "maintenance",
    ref: "07",
    title: "Property Maintenance and Renovations",
    subtitle: "One Accountable Team for Homes and Workplaces",
    badge: "Property Maintenance",
    complianceSpec: "Planned Maintenance & Quality Handover",
    turnaroundEstimate: "Scheduled to Suit Your Property",
    description: "Ongoing property maintenance and renovation support for homeowners, landlords, offices and commercial properties.",
    subServices: [
      "Home and office maintenance",
      "General repairs and fault finding",
      "Interior and exterior upgrades",
      "Preventive maintenance visits",
      "Multi-trade renovation projects",
      "Interior wall knocking & drywall partitions",
      "Property inspections and quotations"
    ],
    keyDeliverables: [
      "A clear scope and itemized quotation before work begins",
      "Coordinated trade work through one point of contact",
      "Protection of occupied work and living areas",
      "Site cleanup and a clear handover on completion"
    ],
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMZZfvYj_ogC5PHef0pfHlXLvLzpPTh-RMe90qSLqs4X9KVxWpGb-A6pnZAblexERrNdb1071916ossFFyR8nCya2G-g-A88PJZL10Ll7H-zEAAtFnpSMg8emwJ-Ut4Qe77-ExeaPX8jOVIYzIZPOgK4Pf9dY72OPMbf36GmZLOxJrwPT8dQbwt_ufRzMrlbsXzbXV2kM65P0p4aLdJfZvr-ppHZcuyxcOk0EXXvao_O09Hu49gEKmog",
        alt: "Commercial property maintenance and renovation work"
      }
    ]
  },
  {
    id: "glass-works",
    ref: "08",
    title: "Glass and Glazing Repairs",
    subtitle: "Glass Replacement, Fitting & Adjustments",
    badge: "Glazing",
    complianceSpec: "Secure Glass Fitting & Weather Sealing",
    turnaroundEstimate: "Scheduled After Site Measurement",
    description: "Glass replacement, window repairs and glazing services for residential and commercial properties.",
    subServices: [
      "Broken glass replacement",
      "New glass installations",
      "Window and door glazing repairs",
      "Glass putty and seal replacement",
      "Shopfront and office glazing maintenance"
    ],
    keyDeliverables: [
      "Accurate site measurements before glass is ordered",
      "Safe removal and disposal of damaged glass",
      "Secure fitting with neat perimeter sealing",
      "Operation and finish checked at handover"
    ],
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-R9slRj8pHriM1qJRCenS2nTSqmSNIFOVWRtT0xQc1oAi428N7wPN2Shqed0pKdQqO_CPoHvu6CwulsjUHfLlX9rBQpqJOh0PAZV6QTxsLqCsDeFg17xH-jPETXzG170dLWk9Vhdt4_QLfWu0PDviYFc0K3SqLug6DHJeD2VzNy3Os0J7qL1ALpCJRWksmLqLIu2kUx-DglPvB9dRvVxegx7SawZWXz5_wdQeosiCVMp8BLMLp1NMEw",
        alt: "Aluminium window glazing and glass fitting"
      }
    ]
  },
  {
    id: "flooring",
    ref: "09",
    title: "Tiling, Flooring and Carpets",
    subtitle: "Floor Preparation, Installation & Repairs",
    badge: "Flooring",
    complianceSpec: "Level Substrate & Clean Finish",
    turnaroundEstimate: "Based on Room Size and Preparation",
    description: "Flooring installation and repair for homes, offices and commercial spaces.",
    subServices: [
      "Floor and wall tiling",
      "Carpet installation and replacement",
      "Laminate flooring installation",
      "Removal of damaged floor finishes",
      "Grout, trim and transition repairs"
    ],
    keyDeliverables: [
      "Subfloor assessment and preparation",
      "Straight, consistent installation lines",
      "Neat edges, transitions and skirting details",
      "Final cleanup and inspection of the finished floor"
    ],
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhn1sUA6cb-u7_UcSjwVtj8mYU_9j9n2KM-whcFNotHerF1_AL4BDn6l5hxIcs7BnakIhhjbw-rjNRkdaigAzx8BCN0nldDNdOLdJDM8-HkAMDMkgyYgXK9E2UZ-FbxS3vGj3n9DAcq0vRFFpMC5-JovMRR_Y7C9oFUrPv0BuQf2FPXmvyW1ZDyoNaWWPG4nx0iT75PQIPYG6D_WhOp1dYapgfiYYyFYaOqAiTGkKC3w4iw6ZqKl7diw",
        alt: "Paving and flooring finish installation"
      }
    ]
  },
  {
    id: "gutters-fascia",
    ref: "10",
    title: "Gutter, Downpipe and Fascia Repairs",
    subtitle: "Roofline Water Management & Repairs",
    badge: "Roofline Systems",
    complianceSpec: "Secure Fixings & Directed Stormwater Runoff",
    turnaroundEstimate: "Scheduled After Roofline Inspection",
    description: "Roofline repairs that help direct rainwater away from walls, foundations and other parts of the property.",
    subServices: [
      "Gutter leak and joint repairs",
      "Gutter replacement and realignment",
      "Down pipe installation and clearing",
      "Fascia board repair and replacement",
      "Stormwater discharge improvements"
    ],
    keyDeliverables: [
      "Roofline inspection and runoff assessment",
      "Correct gutter fall and secure bracket spacing",
      "Sealed joints and firmly connected down pipes",
      "Water flow checked after installation or repair"
    ],
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWBax_T46uynpNADscXDGNia53Vtqt3pDjUalC-YisLuULknn1B90Koezbct_9d1CQTMsgPGcZeV4vymQHc6C5YAk9OTLt12X49yKeFuVC8hRqcNjBs1YFZ1Zf440cOvK0Ktuvsjy4LWfilLn3g0XBglfqc-l-R8bLP57-hQyAlbCaGLEPLIK4rAM_HIIdvnGpTkYX_m-Shw8JtnQ8IUr9Q4KvhmztTLBh33a5HQCKVt05tNFuDDlxVw",
        alt: "Carport roof sheeting and integrated guttering"
      }
    ]
  },
  {
    id: "aluminium-windows-doors",
    ref: "11",
    title: "Aluminium Windows and Doors",
    subtitle: "Aluminium Framing, Glazing & Hardware",
    badge: "Aluminium Fitting",
    complianceSpec: "Weather-Sealed Frames & Smooth Operation",
    turnaroundEstimate: "Scheduled After Site Measurement",
    description: "Aluminium window and door installation, repairs, adjustments and hardware maintenance.",
    subServices: [
      "Aluminium window installation",
      "Aluminium door installation",
      "Window and door alignment repairs",
      "Handles, locks and rollers",
      "Weather seals and glazing maintenance"
    ],
    keyDeliverables: [
      "Accurate opening measurement and frame alignment",
      "Secure frame fixing and perimeter weather sealing",
      "Functional locks, handles and rollers",
      "Window and door operation checked at handover"
    ],
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-R9slRj8pHriM1qJRCenS2nTSqmSNIFOVWRtT0xQc1oAi428N7wPN2Shqed0pKdQqO_CPoHvu6CwulsjUHfLlX9rBQpqJOh0PAZV6QTxsLqCsDeFg17xH-jPETXzG170dLWk9Vhdt4_QLfWu0PDviYFc0K3SqLug6DHJeD2VzNy3Os0J7qL1ALpCJRWksmLqLIu2kUx-DglPvB9dRvVxegx7SawZWXz5_wdQeosiCVMp8BLMLp1NMEw",
        alt: "Aluminium window and door framing installation"
      }
    ]
  }
];

export const homeServicesData = servicesData.filter((service) =>
  ["electrical", "painting", "carpentry", "plumbing", "palisades", "paving"].includes(service.id)
);
