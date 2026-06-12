import React, { useEffect, useMemo, useState } from 'react';
import './SloganCarousel.css';

const associatedCompanies = [
  { name: 'Aegencons', logo: '/images/E-Asociadas/aegencons.png' },
  { name: 'Conorvial', logo: '/images/E-Asociadas/Conorvial.png' },
  { name: 'Constructora Sudamericana', logo: '/images/E-Asociadas/constructora_sudamericana.png' },
  { name: 'Cubero Rubio', logo: '/images/E-Asociadas/cubero_rubio.png' },
  { name: 'Dique Norte Puerto Madero', logo: '/images/E-Asociadas/Dique_Norte_Puerto_Madero.png' },
  { name: 'La Editorial', logo: '/images/E-Asociadas/La_Editorial_Logo.png' },
  { name: 'Preving', logo: '/images/E-Asociadas/preving-logo.png' },
  { name: 'Prima Caballito', logo: '/images/E-Asociadas/prima_caballito.png' },
  { name: 'Quartier', logo: '/images/E-Asociadas/QUARTIER.png' }
];

const isVisiblePixel = (red, green, blue, alpha) => {
  const alphaThreshold = 20;
  const whiteThreshold = 245;

  if (alpha < alphaThreshold) {
    return false;
  }

  return !(red >= whiteThreshold && green >= whiteThreshold && blue >= whiteThreshold);
};

const normalizeLogo = (src) =>
  new Promise((resolve) => {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        resolve(src);
        return;
      }

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      context.drawImage(image, 0, 0);

      const { data, width, height } = context.getImageData(0, 0, canvas.width, canvas.height);

      let minX = width;
      let minY = height;
      let maxX = -1;
      let maxY = -1;

      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const pixelOffset = (y * width + x) * 4;
          const red = data[pixelOffset];
          const green = data[pixelOffset + 1];
          const blue = data[pixelOffset + 2];
          const alpha = data[pixelOffset + 3];

          if (isVisiblePixel(red, green, blue, alpha)) {
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }
      }

      if (maxX < minX || maxY < minY) {
        resolve(src);
        return;
      }

      const contentWidth = maxX - minX + 1;
      const contentHeight = maxY - minY + 1;
      const padding = 10;

      const outputCanvas = document.createElement('canvas');
      outputCanvas.width = contentWidth + padding * 2;
      outputCanvas.height = contentHeight + padding * 2;

      const outputContext = outputCanvas.getContext('2d');
      if (!outputContext) {
        resolve(src);
        return;
      }

      outputContext.drawImage(
        canvas,
        minX,
        minY,
        contentWidth,
        contentHeight,
        padding,
        padding,
        contentWidth,
        contentHeight
      );

      resolve(outputCanvas.toDataURL('image/png'));
    };

    image.onerror = () => resolve(src);
    image.src = src;
  });

const SloganCarousel = () => {
  const [normalizedLogoMap, setNormalizedLogoMap] = useState({});

  useEffect(() => {
    let isMounted = true;

    const normalizeAllLogos = async () => {
      const normalizedEntries = await Promise.all(
        associatedCompanies.map(async (company) => {
          const normalizedLogo = await normalizeLogo(company.logo);
          return [company.logo, normalizedLogo];
        })
      );

      if (isMounted) {
        setNormalizedLogoMap(Object.fromEntries(normalizedEntries));
      }
    };

    normalizeAllLogos();

    return () => {
      isMounted = false;
    };
  }, []);

  const normalizedCompanies = useMemo(
    () =>
      associatedCompanies.map((company) => ({
        ...company,
        logo: normalizedLogoMap[company.logo] || company.logo
      })),
    [normalizedLogoMap]
  );

  const duplicatedLogos = [...normalizedCompanies, ...normalizedCompanies];

  return (
    <section className="slogan-carousel">
      <div className="carousel-container">
        <div className="carousel-track">
          {duplicatedLogos.map((company, index) => (
            <div key={`${company.name}-${index}`} className="slogan-item">
              <img
                src={company.logo}
                alt={`Logo de ${company.name}`}
                className="company-logo"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SloganCarousel;

