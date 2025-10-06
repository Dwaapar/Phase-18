import React from "react";

const clients = [
  "Adobe", "Microsoft", "Google", "Amazon", "Netflix", "Spotify", 
  "Nike", "Adidas", "Coca-Cola", "McDonald's", "Samsung", "Apple"
];

export default function ClientsSection() {
  return (
    <section className="section-spacing-sm bg-white border-y border-monks-light-gray">
      <div className="max-width-container">
        <div className="text-center mb-16">
          <h2 className="text-large font-bold text-monks-black mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-monks-text-gray">
            We partner with the world's most innovative brands
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {[...clients, ...clients].map((client, i) => (
              <div key={i} className="flex-shrink-0 mx-8 lg:mx-12">
                <div className="w-32 h-16 bg-monks-light-gray rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🏢</div>
                    <p className="text-xs text-monks-text-gray font-medium">
                      {client}
                    </p>
                    <p className="text-xs text-monks-gray mt-1">
                      LOGO SPECS:<br/>
                      200x100px, PNG<br/>
                      Transparent BG
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}