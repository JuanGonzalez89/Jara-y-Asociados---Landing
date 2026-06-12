# Jara y Asociados - Landing Page

## Descripción

Esta es una landing page corporativa para Jara y Asociados S.R.L., una empresa dedicada a la administración de bienes inmuebles, gestión de consorcios, fideicomisos inmobiliarios y locaciones civiles y comerciales.

El sitio fue pensado para comunicar la propuesta de valor de la empresa, mostrar su experiencia, presentar sus servicios y facilitar el contacto comercial de potenciales clientes.

## Objetivo de la página

El objetivo principal de esta web es convertir visitas en consultas. Para eso, la landing:

- presenta de forma clara quién es Jara y Asociados,
- destaca más de 40 años de experiencia en el rubro,
- muestra los servicios principales de la empresa,
- expone información de contacto y canales de atención,
- permite solicitar presupuestos y enviar consultas desde el sitio,
- refuerza la confianza con elementos visuales, referencias institucionales y un mapa de barrios administrados.

## Funcionalidades principales

- Hero inicial con llamado a la acción para solicitar presupuesto.
- Sección “Sobre nosotros” con descripción institucional.
- Bloque de estadísticas y experiencia.
- Servicios principales:
  - Gestión de consorcios.
  - Locaciones.
  - Fideicomisos inmobiliarios.
  - Asesoramiento legal y técnico.
- Sección de gestión interna.
- Mapa interactivo de edificios y barrios administrados.
- Carrusel de mensajes institucionales.
- Formulario de contacto.
- Botón flotante de WhatsApp.
- Footer con datos de contacto, servicios y newsletter de cotización.

## Tecnologías utilizadas

- React 18.3.1
- React Scripts 5.0.1
- Leaflet y React Leaflet
- @vercel/speed-insights
- FormSubmit para el envío de formularios


## Estructura general

- `public/`: imágenes, favicon y archivos públicos.
- `src/components/`: componentes de la landing.
- `src/data/`: datos de barrios y edificios.
- `src/App.js`: composición principal de la página.

## Contacto y formularios

Los formularios del sitio envían consultas a la casilla de la empresa mediante FormSubmit. El formulario principal permite enviar nombre, teléfono, email, consorcio y consulta.