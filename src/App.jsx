import React, { useEffect, useState } from "react";
import "./styles.css";
import { Mail, MapPin, Phone, Gauge, Fuel, Cog, ShieldCheck, FileCheck, Wallet } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa6";
import hero from "./hero.jpg";
import { createPortal } from "react-dom";

const marcas = [
  {
    slug: "mazda", nombre: "Mazda", lema: "Diseño Kodo y manejo preciso", vehiculos: [
      { modelo: "Mazda 3 Grand Touring", anio: 2021, km: 38000, precio: 89900000, transmision: "Automática", combustible: "Gasolina", ciudad: "Bogotá", imagen: "/carros/mazda3grandturing2021.jpg" },
      { modelo: "Mazda CX-5 Touring", anio: 2020, km: 52000, precio: 104500000, transmision: "Automática", combustible: "Gasolina", ciudad: "Medellín", imagen: "/carros/mazdacx5touring2020.jpg" },
      { modelo: "Mazda 2 Sedán", anio: 2019, km: 61000, precio: 58900000, transmision: "Mecánica", combustible: "Gasolina", ciudad: "Cali", imagen: "/carros/mazda2sedan2019.jpg" },
    ]
  },
  {
    slug: "nissan", nombre: "Nissan", lema: "Tecnología japonesa confiable", vehiculos: [
      { modelo: "Nissan Kicks Advance", anio: 2022, km: 24000, precio: 86900000, transmision: "Automática", combustible: "Gasolina", ciudad: "Bogotá", imagen: "/carros/nissankicksadnvance2022.jpg" },
      { modelo: "Nissan Versa Sense", anio: 2020, km: 47000, precio: 59500000, transmision: "Mecánica", combustible: "Gasolina", ciudad: "Barranquilla", imagen: "/carros/nissanversasense2020.jpg" },
      { modelo: "Nissan Frontier LE 4x4", anio: 2019, km: 88000, precio: 129000000, transmision: "Mecánica", combustible: "Diésel", ciudad: "Bucaramanga", imagen: "/carros/nissanfrontierle4x42019.jpg" },
    ]
  },
  {
    slug: "chevrolet", nombre: "Chevrolet", lema: "El carro de Colombia", vehiculos: [
      { modelo: "Chevrolet Onix Premier", anio: 2022, km: 21000, precio: 69900000, transmision: "Automática", combustible: "Gasolina", ciudad: "Bogotá", imagen: "/carros/chevroletonixpremier2022.jpg" },
      { modelo: "Chevrolet Tracker LTZ", anio: 2021, km: 35000, precio: 92000000, transmision: "Automática", combustible: "Gasolina", ciudad: "Pereira", imagen: "/carros/chevrolettrackerltz2021.jpg" },
    ]
  },
  {
    slug: "renault", nombre: "Renault", lema: "Versatilidad para cada día", vehiculos: [
      { modelo: "Renault Duster Intens", anio: 2021, km: 42000, precio: 74900000, transmision: "Mecánica", combustible: "Gasolina", ciudad: "Medellín", imagen: "/carros/reanultdusterintens2021.jpg" },
      { modelo: "Renault Sandero Life", anio: 2020, km: 55000, precio: 46500000, transmision: "Mecánica", combustible: "Gasolina", ciudad: "Cali", imagen: "/carros/renaultsanderolife2020.jpg" },
    ]
  },
  {
    slug: "toyota", nombre: "Toyota", lema: "Durabilidad legendaria", vehiculos: [
      { modelo: "Toyota Corolla Cross XEI", anio: 2022, km: 29000, precio: 124900000, transmision: "Automática", combustible: "Híbrido", ciudad: "Bogotá", imagen: "/carros/toyotacross2022.jpg" },
      { modelo: "Toyota Hilux 2.4 4x4", anio: 2020, km: 76000, precio: 159000000, transmision: "Mecánica", combustible: "Diésel", ciudad: "Villavicencio", imagen: "/carros/toyotahilux2020.jpg" },
    ]
  },
  {
    slug: "kia", nombre: "Kia", lema: "Equipamiento que sorprende", vehiculos: [
      { modelo: "Kia Sportage Vibrant", anio: 2021, km: 40000, precio: 99900000, transmision: "Automática", combustible: "Gasolina", ciudad: "Bogotá", imagen: "/carros/kiasportage2021.jpg" },
      { modelo: "Kia Picanto Zenith", anio: 2022, km: 18000, precio: 54900000, transmision: "Automática", combustible: "Gasolina", ciudad: "Manizales", imagen: "/carros/kiapikantozenith2022.jpg" },
    ]
  },
];

const WEB3FORMS_KEY = "c15508d3-3de9-4bed-a8d5-924af6a4e9e6";

const formatoPrecio = (n) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);
const formatoKm = (n) => `${new Intl.NumberFormat("es-CO").format(n)} km`;

const nav = [{ to: "/", label: "Inicio" }, { to: "/vehiculos", label: "Vehículos" }, { to: "/nosotros", label: "Nosotros" }, { to: "/contacto", label: "Contacto" }];

function Header({ path }) {
  return <header className="site-header"><div className="container header-inner"><a href="/" className="brand">Rueda<span>Segura</span></a><nav>{nav.map((n) => <a key={n.to} href={n.to} className={path === n.to ? "nav-link active" : "nav-link"}>{n.label}</a>)}</nav></div></header>;
}

function BrandStrip() {
  return <div className="brand-grid">{marcas.map((m) => <a key={m.slug} href={`/marcas/${m.slug}`} className="brand-tile"><img className="brand-logo" src={`/marcas/${m.slug}.jpg`} alt={m.nombre} /><span className="brand-name">{m.nombre}</span><span className="muted small">{m.vehiculos.length} disponibles</span></a>)}</div>;
}

function Lightbox({ fotos, titulo, onClose }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setI((n) => (n - 1 + fotos.length) % fotos.length);
      if (e.key === "ArrowRight") setI((n) => (n + 1) % fotos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fotos.length, onClose]);

  return createPortal(
    <div className="lightbox" onClick={onClose} role="dialog" aria-label={titulo}>
      <button className="lb-close" onClick={onClose} aria-label="Cerrar">✕</button>
      {fotos.length > 1 && <button className="lb-arrow lb-prev" onClick={(e) => { e.stopPropagation(); setI((i - 1 + fotos.length) % fotos.length); }} aria-label="Anterior">‹</button>}
      <img src={fotos[i]} alt={titulo} onClick={(e) => e.stopPropagation()} />
      {fotos.length > 1 && <button className="lb-arrow lb-next" onClick={(e) => { e.stopPropagation(); setI((i + 1) % fotos.length); }} aria-label="Siguiente">›</button>}
      <p className="lb-caption">{titulo}{fotos.length > 1 && ` · ${i + 1}/${fotos.length}`}</p>
    </div>,
    document.body
  );
}

function VehicleCard({ v }) {
  const [abierto, setAbierto] = useState(false);
  const fotos = v.imagenes || [v.imagen];
  return <article className="vehicle-card"><button className="car-visual car-photo" onClick={() => setAbierto(true)} aria-label={`Ver fotos de ${v.modelo}`}>
    <img src={fotos[0]} alt={v.modelo} />
  </button>
    {abierto && <Lightbox fotos={fotos} titulo={v.modelo} onClose={() => setAbierto(false)} />}<div className="vehicle-info"><h3>{v.modelo}</h3><ul className="vehicle-specs"><li><Gauge />{formatoKm(v.km)}</li><li><Cog />{v.transmision}</li><li><Fuel />{v.combustible}</li></ul><p className="location"><MapPin />{v.ciudad}</p><div className="vehicle-bottom"><strong>{formatoPrecio(v.precio)}</strong><a href={`/contacto?carro=${encodeURIComponent(v.modelo)}`}>Lo quiero</a></div></div></article>;
}

function Home() {
  const destacados = marcas.flatMap((m) => m.vehiculos.slice(0, 1)).slice(0, 6);
  const benefits = [{ Icon: ShieldCheck, title: "Peritaje de 150 puntos", text: "Cada carro pasa una revisión técnica completa." }, { Icon: FileCheck, title: "Traspaso garantizado", text: "Nos encargamos de todo el papeleo." }, { Icon: Wallet, title: "Financiación fácil", text: "Crédito aprobado en menos de 24 horas." }];
  return <><section className="hero" style={{ backgroundImage: `url(${hero})` }}><div className="hero-overlay" /><div className="container hero-content"><p className="eyebrow">Usados certificados</p><h1>Encuentra tu próximo carro usado con total confianza</h1><div className="hero-actions"><a href="/vehiculos" className="button">Ver vehículos</a><a href="/contacto" className="button button-outline">Vende tu carro</a></div></div></section><section className="container section"><h2>Elige tu marca</h2><BrandStrip /></section><section className="container benefits">{benefits.map(({ Icon, title, text }) => <article className="benefit" key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}</section><section className="container section featured"><h2>Destacados de la semana</h2><div className="vehicle-grid">{destacados.map((v) => <VehicleCard key={v.modelo} v={v} />)}</div></section></>;
}

function Vehicles() {
  return <div className="container page"><h1>Nuestro inventario por marca</h1><div className="page-brands"><BrandStrip /></div>{marcas.map((m) => <section className="inventory-section" key={m.slug}><div className="section-heading"><h2>{m.nombre}</h2><a href={`/marcas/${m.slug}`}>Ver sección</a></div><div className="vehicle-grid">{m.vehiculos.map((v) => <VehicleCard key={v.modelo} v={v} />)}</div></section>)}</div>;
}

function About() {
  const stats = [["12.000+", "Carros vendidos"], ["15", "Años de experiencia"], ["4.8/5", "Calificación clientes"], ["6", "Marcas aliadas"]];
  return <div className="container page"><h1>Gente que cuida tu inversión</h1><p className="lead">Somos un equipo de mecánicos, asesores y apasionados por los carros. Revisamos, certificamos y respaldamos cada vehículo como si fuera para nuestra familia.</p><div className="stats-grid">{stats.map(([n, l]) => <article className="stat" key={l}><strong>{n}</strong><span>{l}</span></article>)}</div><h2 className="values-title">Nuestros valores</h2><ul className="values-grid">{["Transparencia en cada precio", "Revisión técnica honesta", "Acompañamiento después de la venta"].map((v) => <li key={v}>{v}</li>)}</ul></div>;
}

function Contact() {
  const carro = new URLSearchParams(window.location.search).get("carro") || "";
  const [estado, setEstado] = useState("idle");

  async function enviarFormulario(event) {
    event.preventDefault();
    setEstado("enviando");
    const datos = new FormData(event.currentTarget);
    datos.append("access_key", WEB3FORMS_KEY);
    datos.append("subject", carro ? `Interés en ${carro} - RuedaSegura` : "Nueva solicitud - RuedaSegura");
    datos.append("from_name", "Sitio RuedaSegura");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: datos });
      const json = await res.json();
      setEstado(json.success ? "enviado" : "error");
    } catch {
      setEstado("error");
    }
  }

  return <div className="container contact-layout page"><div><h1>Hablemos de tu próximo carro</h1><p className="lead">¿Quieres comprar, vender o recibir tu carro como parte de pago? Déjanos tus datos y un asesor te contactará en menos de 2 horas.</p><h2 className="values-title">Horario</h2><p className="muted">Lunes a sábado 8:00 a.m. – 6:00 p.m.<br />Domingos 10:00 a.m. – 3:00 p.m.</p></div><form className="contact-form" onSubmit={enviarFormulario}>{estado === "enviado" ? <p className="success" role="status">¡Gracias! Recibimos tu solicitud y un asesor te contactará pronto.</p> : <>{carro && <p className="muted" style={{ margin: 0 }}>Carro de interés: <strong>{carro}</strong></p>}<input type="hidden" name="carro" value={carro} /><input type="checkbox" name="botcheck" style={{ display: "none" }} tabIndex="-1" autoComplete="off" /><input name="nombre" required maxLength="120" placeholder="Nombre completo" aria-label="Nombre completo" /><input name="telefono" required maxLength="40" type="tel" placeholder="Teléfono" aria-label="Teléfono" /><input name="correo" required maxLength="254" type="email" placeholder="Correo" aria-label="Correo" /><select name="motivo" defaultValue="comprar" aria-label="Motivo de contacto"><option value="comprar">Quiero comprar</option><option value="vender">Quiero vender mi carro</option><option value="financiar">Quiero financiación</option></select><textarea name="mensaje" maxLength="2000" rows="4" placeholder="Mensaje" aria-label="Mensaje" />{estado === "error" && <p role="alert" style={{ margin: 0, color: "#b3261e", fontSize: 14 }}>No pudimos enviar tu solicitud. Intenta de nuevo en un momento.</p>}<button className="button" type="submit" disabled={estado === "enviando"}>{estado === "enviando" ? "Enviando..." : "Enviar"}</button></>}</form></div>;
}

function BrandPage({ slug }) {
  const marca = marcas.find((m) => m.slug === slug);
  if (!marca) return <div className="container page not-found"><h1>Marca no encontrada</h1><a className="button" href="/vehiculos">Ver todas las marcas</a></div>;
  return <div className="container page"><p className="eyebrow">{marca.lema}</p><h1>{marca.nombre} usados certificados</h1><div className="vehicle-grid brand-cars">{marca.vehiculos.map((v) => <VehicleCard key={v.modelo} v={v} />)}</div><h2 className="values-title">Otras marcas</h2><BrandStrip /></div>;
}

function Footer() {
  return <><section className="story"><div className="container story-inner"><h2>Nuestra historia</h2><p>RuedaSegura nació en 2024 en un pequeño lote de Manizales con cinco carros y una promesa: vender usados como nos gustaría comprarlos. Hoy hemos ayudado a más de 12.000 familias colombianas a estrenar su carro, con peritaje certificado, traspaso garantizado y financiación a la medida. Seguimos siendo una empresa familiar que cree en la palabra.</p></div></section><footer className="site-footer"><div className="container footer-grid"><div><p className="brand footer-brand">Rueda<span>Segura</span></p><p className="footer-muted">Concesionario de vehículos usados certificados.</p></div><ul className="contact-list"><li><Phone /><a href="tel:+573134228898">+57 313 422 8898 - +57 313 514 5644</a></li><li><Mail /><a href="mailto:ventas@ruedasegura.co">ventas@ruedasegura.co</a></li><li><MapPin />Av. Santander #80-45, Manizales</li></ul><div><p>Síguenos</p><div className="social-links"><a href="https://www.facebook.com/" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a><a href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a> <a href="https://www.youtube.com/" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><FaYoutube /></a> <a href="https://wa.me/573134228898?text=Hola%2C%20quiero%20información%20sobre%20un%20carro" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a> <a href="https://wa.me/573135145644?text=Hola%2C%20necesito%20ayuda" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp soporte" title="WhatsApp soporte"><FaWhatsapp /></a></div></div></div><p className="copyright">© {new Date().getFullYear()} RuedaSegura. Todos los derechos reservados.</p></footer></>;
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname.replace(/\/$/, "") || "/");
  useEffect(() => { const update = () => setPath(window.location.pathname.replace(/\/$/, "") || "/"); window.addEventListener("popstate", update); return () => window.removeEventListener("popstate", update); }, []);
  useEffect(() => { const page = nav.find((n) => n.to === path); document.title = page ? `${page.label === "Inicio" ? "Carros usados certificados en Colombia" : page.label + " | RuedaSegura"}` : path.startsWith("/marcas/") ? `${marcas.find((m) => m.slug === path.split("/")[2])?.nombre || "Marca"} usados certificados | RuedaSegura` : "Página no encontrada | RuedaSegura"; }, [path]);
  let page;
  if (path === "/") page = <Home />;
  else if (path === "/vehiculos") page = <Vehicles />;
  else if (path === "/nosotros") page = <About />;
  else if (path === "/contacto") page = <Contact />;
  else if (path.startsWith("/marcas/")) page = <BrandPage slug={path.split("/")[2]} />;
  else page = <div className="container page not-found"><h1>Página no encontrada</h1><a className="button" href="/">Volver al inicio</a></div>;
  return <><Header path={path} /><main>{page}</main><Footer /></>;
}
