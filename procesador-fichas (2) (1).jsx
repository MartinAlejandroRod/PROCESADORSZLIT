import React, { useState, useRef, useCallback, useEffect } from "react";

const LOGO = "data:image/png;base64,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";

/* ══════════════════════════════════════════════════════════════
   CONFIGURACIÓN — completar antes de publicar la página
   ══════════════════════════════════════════════════════════════ */
// 1) Firebase: pegá la config de tu proyecto (Consola Firebase → Configuración del proyecto → SDK).
//    Con un projectId válido, el contador de fichas del día se sincroniza entre computadoras.
//    Mientras diga "TU_PROJECT_ID" el contador funciona LOCAL (solo en esta compu / sesión).
const FIREBASE_CONFIG = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT_ID.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID",
};
// 2) Clave de la API de Anthropic. DEJALA VACÍA para probar dentro de Claude.
//    Al publicar la página en tu hosting, pegá tu clave (sk-ant-...) para que el
//    procesamiento funcione fuera de Claude (uso interno, en computadoras de confianza).
const ANTHROPIC_API_KEY = "";
const FIREBASE_VER = "10.12.2";

/* ══════════════════════════════════════════════════════════════
   LÓGICA PORTADA DESDE plantilla_fichas_szlit_v3_FINAL.py
   ══════════════════════════════════════════════════════════════ */

const CAMPOS_GENERALES = [
  ["apellido", "Apellido/s"],
  ["nombre", "Nombre/s"],
  ["celular", "Número de celular"],
  ["como_conocio", "Cómo conoció el estudio"],
  ["tareas", "Tareas que realiza"],
];
const CAMPOS_ADICIONALES = [
  ["email", "Correo electrónico"],
  ["celular_alt", "Celular alternativo"],
  ["direccion", "Dirección"],
  ["fecha_nacimiento", "Fecha de nacimiento"],
  ["cuil", "CUIL / DNI"],
  ["nacionalidad", "Nacionalidad"],
  ["estado_civil", "Estado civil"],
];
const CAMPOS_SALUD_ACCIDENTE = [
  ["desc_accidente", "¿Cómo fue su accidente de trabajo?"],
  ["fecha_accidente", "Fecha del accidente"],
  ["atencion_medica", "¿Recibió atención médica?"],
  ["donde_atendio", "¿Dónde se atendió?"],
  ["fecha_primera_atencion", "Fecha primera atención médica"],
  ["tratamiento", "Tratamiento médico recibido"],
  ["secuelas", "Secuelas, dolores o molestias"],
];
const CAMPOS_SALUD_ENFERMEDAD = [
  ["problemas_salud", "¿Qué problemas de salud tiene?"],
  ["desde_cuando", "¿Desde cuándo tiene estos problemas?"],
  ["tareas_problema", "¿Qué tareas generaron el problema?"],
  ["atencion_medica", "¿Recibió atención médica?"],
  ["donde_atendio", "¿Dónde se atendió?"],
  ["fecha_primera_atencion", "Fecha primera atención médica"],
  ["tratamiento", "Tratamiento médico recibido"],
];

const ACL_HIPOTETICO =
  "ESCENARIO HIPOTÉTICO — el/la consultante NO fue despedido/a. Este monto refleja lo que cobraría si lo/la despidieran sin causa hoy. NO es lo que le corresponde en su situación actual.";

const NOMBRES_DIA = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
const DIAS_ALIASES = {
  0: ["lunes", "lun"], 1: ["martes", "mar"], 2: ["miércoles", "miercoles", "mié", "mie"],
  3: ["jueves", "jue"], 4: ["viernes", "vie"], 5: ["sábado", "sabado", "sáb", "sab"], 6: ["domingo", "dom"],
};

function parseFecha(s) {
  if (!s || s === "—") return null;
  s = String(s).trim();
  let m = s.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);
  if (m) return new Date(+m[3], +m[2] - 1, +m[1]);
  m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
  return null;
}
function parseSueldo(s) {
  if (!s || s === "—") return 0;
  s = String(s).replace(/\(.*?\)/g, " ");
  const m = s.match(/[\d][\d.,]*/);
  if (!m) return 0;
  const n = m[0].replace(/[.,]/g, "").trim();
  const v = parseFloat(n);
  return isNaN(v) ? 0 : v;
}
const fmtARS = (n) => "$" + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function calcAntiguedad(fs) {
  const dt = parseFecha(fs);
  if (!dt) return "—";
  const days = Math.floor((Date.now() - dt.getTime()) / 86400000);
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  if (years > 0 && months > 0) return `${years} año${years > 1 ? "s" : ""} y ${months} mes${months > 1 ? "es" : ""}`;
  if (years > 0) return `${years} año${years > 1 ? "s" : ""}`;
  return `${months} mes${months > 1 ? "es" : ""}`;
}

function verificarFechaVsDias(fs, ds) {
  if (!fs || !ds || fs === "—") return null;
  const dt = parseFecha(fs);
  if (!dt) return null;
  const dow = (dt.getDay() + 6) % 7; // 0 = lunes
  const nombre = NOMBRES_DIA[dow];
  const dl = String(ds).toLowerCase();
  let wd = new Set();
  if (dl.includes("lunes a viernes")) wd = new Set([0, 1, 2, 3, 4]);
  else if (dl.includes("lunes a sábado") || dl.includes("lunes a sabado")) wd = new Set([0, 1, 2, 3, 4, 5]);
  else if (dl.includes("lunes a domingo")) wd = new Set([0, 1, 2, 3, 4, 5, 6]);
  else {
    for (const k in DIAS_ALIASES) {
      for (const a of DIAS_ALIASES[k]) { if (dl.includes(a)) { wd.add(+k); break; } }
    }
  }
  if (wd.size === 0) return null;
  let coincide = wd.has(dow);
  if (!coincide && dow === 5 && dl.includes("varia") && (dl.includes("sábado") || dl.includes("sabado"))) coincide = true;
  if (!coincide && dow === 6 && dl.includes("varia") && (dl.includes("domingo") || dl.includes("dom"))) coincide = true;
  return { coincide, nombre };
}

function getCamposLaborales(motivo, reg, fueDesp) {
  const B = reg === "Blanco", N = reg === "Negro", Gr = reg === "Gris";
  const c = [];
  const desp = fueDesp && fueDesp.toLowerCase().startsWith("s");
  if (motivo === "Renuncia") c.push(["motivo_renuncia", "Motivo de la renuncia"]);
  if (motivo === "Tengo problemas en mi trabajo") c.push(["problemas_detalle", "¿Qué problemas tiene en su trabajo? (detallar)"]);
  if (motivo === "Otro") c.push(["motivo_detalle", "¿Cuál es el motivo de su consulta? (detallar)"]);
  if (motivo === "Cálculo liquidación") { c.push(["fue_despedido", "¿A usted la/lo despidieron?"]); if (desp) c.push(["fecha_despido", "Fecha del despido"]); }
  if (B && motivo !== "Tengo problemas en mi trabajo") c.push(["fecha_ingreso_recibo", "Fecha de ingreso según recibo"]);
  else if (N) c.push(["fecha_ingreso_real", "Fecha de ingreso"]);
  else if (Gr) { c.push(["fecha_ingreso_recibo", "Fecha de ingreso según recibo"]); c.push(["fecha_ingreso_real", "Fecha de ingreso real"]); }
  else if (B && motivo === "Tengo problemas en mi trabajo") c.push(["fecha_ingreso_recibo", "Fecha de ingreso"]);
  c.push(["frecuencia_cobro", "Frecuencia de cobro"]);
  if (N || Gr) c.push(["forma_cobro", "Forma de cobro (efectivo, transferencia, depósito) — DETALLAR"]);
  if (Gr) { c.push(["sueldo_real", "Sueldo real"]); c.push(["sueldo_recibo", "Sueldo según recibo"]); }
  else if (N && motivo === "Despido") c.push(["mejor_sueldo", "Mejor sueldo mensual"]);
  else c.push(["sueldo_actual", "Sueldo actual"]);
  c.push(["ultimo_sueldo_mes", "Mes que le pagaron el último sueldo"]);
  c.push(["dias_trabajo", "Días que trabajaba (aclarar si los sábados variaban)"]);
  c.push(["horarios", "Horarios de ingreso y salida (aclarar turnos rotativos)"]);
  c.push(["horas_extras", "¿Realizaba normalmente horas extras?"]);
  if (motivo === "Despido") c.push(["fecha_despido", "Fecha del despido"]);
  if (motivo === "Despido" && (B || Gr)) c.push(["carta_documento", "¿Recibió alguna carta documento en su domicilio?"]);
  else if (motivo === "Otro" && (B || Gr)) c.push(["carta_documento", "¿Recibió alguna carta documento en su domicilio?"]);
  else if (motivo === "Cálculo liquidación" && (B || Gr) && desp) c.push(["carta_documento", "¿Recibió alguna carta documento en su domicilio?"]);
  if (motivo === "Renuncia") { c.push(["telegrama_renuncia", "¿Envió telegrama de renuncia por Correo Argentino?"]); c.push(["fecha_telegrama", "Fecha del telegrama de renuncia"]); }
  if (B || Gr) c.push(["empresa", "Empresa/Empleador (como figura en el recibo)"]);
  else c.push(["empresa", "Empresa/Empleador"]);
  c.push(["direccion_trabajo", "Dirección de trabajo (incluir localidad)"]);
  return c;
}

function calcularMonto(sueldoStr, fIngresoStr, fEgresoStr, reg) {
  const sueldo = parseSueldo(sueldoStr);
  if (!sueldo) return null;
  const di = parseFecha(fIngresoStr);
  if (!di) return null;
  const de = fEgresoStr ? (parseFecha(fEgresoStr) || new Date()) : new Date();
  const total_meses = (de.getTime() - di.getTime()) / 86400000 / 30.44;
  const total_anios = total_meses / 12;
  const esNegro = reg === "Negro" || reg === "Gris";
  let monto;
  if (total_meses < 6) {
    monto = esNegro ? sueldo * 2 + 6 * sueldo : sueldo + 6 * sueldo;
  } else if (total_meses < 12) {
    monto = (total_meses / 6) * sueldo + 4 * sueldo;
  } else {
    const ac = Math.floor(total_anios);
    const fr = (total_meses - ac * 12) / 12;
    let base = (ac + fr) * sueldo;
    if (esNegro) { base = base * 2; monto = base + (total_anios >= 7 ? 10 : 6) * sueldo; }
    else monto = base + 6 * sueldo;
  }
  monto += (Math.floor(Math.random() * 9) + 1) * 10000;
  const montoFmt = fmtARS(monto);
  const tipoRel = esNegro ? "NO REGISTRADA" : "REGISTRADA";
  const mensaje =
    `Le comento, teniendo usted una remuneración mensual de ${fmtARS(sueldo)}, ` +
    `habiendo trabajado desde el ${fIngresoStr} en una relación ${tipoRel}, por rubros indemnizatorios, ` +
    `rubros de integración, preaviso, tiempo trabajado allí, multas, diferencias salariales y certificados, ` +
    `deberían estar abonándole como base alrededor de ${montoFmt}`;
  return { montoFmt, mensaje };
}

/* ── Enriquecer el dict del cliente con lo computado ── */
function enrich(raw) {
  const d = { ...raw };
  const motivo = d.motivo || "Otro";
  const reg = d.registracion || "Blanco";
  const tipoSalud = d.tipo_salud || "";
  const fueDesp = d.fue_despedido || "";
  const g = (k) => (d[k] != null && d[k] !== "" ? d[k] : "—");

  const fechaIngreso = d.fecha_ingreso_recibo || d.fecha_ingreso_real || "";
  const antig = fechaIngreso && fechaIngreso !== "—" ? calcAntiguedad(fechaIngreso) : "—";
  const sueldoDisplay = d.sueldo_actual || d.sueldo_real || d.mejor_sueldo || "—";

  const _resumen = [
    ["Celular", g("celular")],
    ["Tareas", g("tareas")],
    ["Sueldo", sueldoDisplay],
    ["Registración", reg],
    ["Antigüedad", fechaIngreso ? `${antig} (desde ${fechaIngreso})` : "—"],
    ["Problema de salud", tipoSalud ? "Sí" : "No"],
    ["Motivo", motivo],
  ];
  const _alertaDia = verificarFechaVsDias(fechaIngreso, d.dias_trabajo || "");

  const secciones = [];
  secciones.push(["DATOS PERSONALES", [...CAMPOS_GENERALES, ...CAMPOS_ADICIONALES].map(([id]) => [labelOf(id), g(id)])]);
  const empLabel = reg === "Blanco" || reg === "Gris" ? "Empresa/Empleador (como figura en el recibo)" : "Empresa/Empleador";
  secciones.push(["EMPRESA / EMPLEADOR", [[empLabel, g("empresa")], ["Dirección de trabajo", g("direccion_trabajo")], ["Tareas que realiza", g("tareas")]]]);
  const mot = [["Motivo de consulta", motivo], ["Situación laboral", reg]];
  if (motivo === "Renuncia" && d.motivo_renuncia) mot.push(["Motivo de renuncia", d.motivo_renuncia]);
  if (motivo === "Tengo problemas en mi trabajo") mot.push(["Detalle del problema", g("problemas_detalle")]);
  if (motivo === "Otro") mot.push(["Detalle de consulta", g("motivo_detalle")]);
  if (motivo === "Cálculo liquidación") mot.push(["¿Lo/la despidieron?", fueDesp || "—"]);
  secciones.push(["MOTIVO Y SITUACIÓN", mot]);
  const skip = new Set(["empresa", "direccion_trabajo", "motivo_renuncia", "problemas_detalle", "motivo_detalle", "fue_despedido"]);
  const lab = getCamposLaborales(motivo, reg, fueDesp).filter(([id]) => !skip.has(id)).map(([id, l]) => [l, g(id)]);
  secciones.push(["DATOS LABORALES", lab]);
  if (tipoSalud === "accidente") secciones.push(["SALUD LABORAL — ACCIDENTE", CAMPOS_SALUD_ACCIDENTE.map(([id, l]) => [l, g(id)])]);
  else if (tipoSalud === "enfermedad") secciones.push(["SALUD LABORAL — ENFERMEDAD PROFESIONAL", CAMPOS_SALUD_ENFERMEDAD.map(([id, l]) => [l, g(id)])]);

  let _calc = null, _aclaracion = "";
  if (motivo !== "Renuncia") {
    let sueldoCalc, fIng;
    if (reg === "Gris") { sueldoCalc = d.sueldo_real || d.sueldo_actual || d.mejor_sueldo || "—"; fIng = d.fecha_ingreso_real || d.fecha_ingreso_recibo || ""; }
    else if (reg === "Negro") { sueldoCalc = d.mejor_sueldo || d.sueldo_actual || d.sueldo_real || "—"; fIng = d.fecha_ingreso_real || d.fecha_ingreso_recibo || ""; }
    else { sueldoCalc = d.sueldo_actual || d.sueldo_real || d.mejor_sueldo || "—"; fIng = d.fecha_ingreso_recibo || d.fecha_ingreso_real || ""; }
    const desp = fueDesp && fueDesp.toLowerCase().startsWith("s");
    if (motivo === "Tengo problemas en mi trabajo" || motivo === "Otro") _aclaracion = ACL_HIPOTETICO;
    else if (motivo === "Cálculo liquidación" && !desp) _aclaracion = ACL_HIPOTETICO;
    _calc = calcularMonto(sueldoCalc, fIng, d.fecha_despido || "", reg);
  }

  const nombreCompleto = `${d.nombre || ""} ${d.apellido || ""}`.trim() || "SIN NOMBRE";
  const fechaConsulta = d.fecha_consulta || new Date().toLocaleDateString("es-AR");
  return { ...d, _nombreCompleto: nombreCompleto, _fechaConsulta: fechaConsulta, _resumen, _secciones: secciones, _alertaDia, _calc, _aclaracion };
}

function labelOf(id) {
  const all = [...CAMPOS_GENERALES, ...CAMPOS_ADICIONALES];
  const f = all.find((x) => x[0] === id);
  return f ? f[1] : id;
}

/* ══════════════════════════════════════════════════════════════
   RENDER DE LA FICHA (HTML) — usado en preview y en la descarga
   ══════════════════════════════════════════════════════════════ */
const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const FOLIO_CSS = `
.f-doc{position:relative;background:#fff;color:#111;font-family:Helvetica,Arial,sans-serif;width:100%;max-width:820px;margin:0 auto;border:1px solid #e2e2e2}
.f-head{position:relative;display:flex;align-items:center;gap:14px;padding:12px 20px;border-bottom:1.5px solid #000;min-height:64px}
.f-head:before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:#000}
.f-logo{width:52px;height:auto;flex:0 0 auto}
.f-hmeta{flex:1;min-width:0}
.f-hname{font-size:18px;font-weight:700;letter-spacing:.3px;color:#000;line-height:1.15}
.f-hsub{font-size:11px;font-weight:700;color:#333;margin-top:3px}
.f-hcel{position:absolute;right:16px;top:50%;transform:translateY(-50%);text-align:center;width:130px}
.f-hcel span{display:block;font-size:8px;font-weight:700;letter-spacing:1px;color:#000}
.f-hcel b{font-size:12px}
.f-notas{position:absolute;top:65px;right:0;bottom:0;width:150px;background:#fafafa;border-left:1px dashed #ccc;padding:6px 8px;background-image:repeating-linear-gradient(#fafafa 0 29px,#e9e9e9 29px 30px);background-position:0 18px}
.f-notas-lbl{font-size:8px;font-style:italic;color:#999;letter-spacing:1px}
.f-body{padding:16px 20px 8px;padding-right:170px}
.f-resumen{background:#f5f5f5;border:1px solid #aaa;border-radius:4px;padding:11px 14px;margin-bottom:14px}
.f-rtitle{font-size:12px;font-weight:700;color:#111;margin-bottom:8px}
.f-rgrid{display:grid;grid-template-columns:1fr 1fr;gap:5px 18px;font-size:11px;line-height:1.35}
.f-ritem b{color:#000}
.f-alert{margin-top:10px;padding:6px 10px;border-radius:3px;font-size:10px;line-height:1.4}
.f-alert b{margin-right:6px}
.f-warn{background:#eeeeee;border:1px solid #555;color:#111}
.f-ok{background:#f0f0f0;border:1px solid #555;color:#111}
.f-section{margin-bottom:12px;break-inside:avoid}
.f-shead{background:#e8e8e8;border-left:4px solid #111;padding:6px 10px 6px 12px;font-size:11px;font-weight:700;color:#000;letter-spacing:.3px}
.f-field{display:flex;gap:14px;padding:5px 4px;border-bottom:1px solid #eee;break-inside:avoid}
.f-k{flex:0 0 195px;font-size:10.5px;font-weight:700;color:#000}
.f-v{flex:1;font-size:10.5px;color:#333;line-height:1.4}
.f-calc{margin-top:6px;break-inside:avoid}
.f-chead{background:#e6f4e6;border-left:4px solid #1a5c1a;padding:6px 10px 6px 12px;font-size:11px;font-weight:700;color:#1a5c1a}
.f-acl{margin-top:6px;background:#fff4e0;border:1px solid #d97706;border-left:4px solid #d97706;border-radius:2px;padding:7px 10px;font-size:9.5px;font-weight:700;color:#92400e;line-height:1.4}
.f-cmsg{margin-top:6px;background:#f0f9f0;border:1px solid #22c55e;border-left:4px solid #22c55e;border-radius:3px;padding:9px 12px}
.f-cml{font-size:9px;font-weight:700;color:#166534;margin-bottom:4px}
.f-cmsg p{margin:0;font-size:10.5px;color:#1a3a1a;line-height:1.5}
.f-foot{border-top:1px solid #aaa;margin:6px 20px 0;padding:8px 0;font-size:8px;color:#999}
`;

function fichaInnerHTML(d) {
  const stamp = new Date().toLocaleString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  let h = '<div class="f-doc">';
  h += '<div class="f-notas"><span class="f-notas-lbl">NOTAS</span></div>';
  h += '<div class="f-head">';
  if (LOGO && LOGO.indexOf("__") !== 0) h += `<img class="f-logo" src="${LOGO}" alt=""/>`;
  h += `<div class="f-hmeta"><div class="f-hname">${esc(d._nombreCompleto).toUpperCase()}</div><div class="f-hsub">Consulta recibida: ${esc(d._fechaConsulta)}</div></div>`;
  h += `<div class="f-hcel"><span>CELULAR</span><b>${esc(d.celular || "—")}</b></div>`;
  h += "</div>";
  h += '<div class="f-body">';
  h += '<div class="f-resumen"><div class="f-rtitle">RESUMEN DE CONSULTA</div><div class="f-rgrid">';
  for (const [l, v] of d._resumen) h += `<div class="f-ritem"><b>${esc(l)}:</b> ${esc(v)}</div>`;
  h += "</div>";
  if (d._alertaDia) {
    const { coincide, nombre } = d._alertaDia;
    h += coincide
      ? `<div class="f-alert f-ok"><b>✓ FECHA DE INGRESO COINCIDE</b><span>Ingresó un día ${esc(nombre)}, consistente con los días declarados</span></div>`
      : `<div class="f-alert f-warn"><b>■ FECHA DE INGRESO NO COINCIDE</b><span>Ingresó un día ${esc(nombre)}, no figura entre los días declarados</span></div>`;
  }
  h += "</div>";
  for (const [title, fields] of d._secciones) {
    h += `<div class="f-section"><div class="f-shead">${esc(title)}</div>`;
    for (const [l, v] of fields) h += `<div class="f-field"><div class="f-k">${esc(l)}</div><div class="f-v">${esc(v)}</div></div>`;
    h += "</div>";
  }
  if (d._calc) {
    h += `<div class="f-calc"><div class="f-chead">CÁLCULO LIQUIDACIÓN — MONTO ESTIMADO: ${esc(d._calc.montoFmt)}</div>`;
    if (d._aclaracion) h += `<div class="f-acl">${esc(d._aclaracion)}</div>`;
    h += `<div class="f-cmsg"><div class="f-cml">MENSAJE PARA EL CLIENTE:</div><p>${esc(d._calc.mensaje)}</p></div></div>`;
  }
  h += "</div>";
  h += `<div class="f-foot">Estudio Jurídico Szlit &amp; Asoc. · Documento generado el ${esc(stamp)} · Uso interno</div>`;
  h += "</div>";
  return h;
}

function buildPrintHTML(d) {
  return (
    '<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Ficha — ' + esc(d.apellido || "") + "</title><style>" +
    "html,body{margin:0}body{background:#e9e9e9;font-family:Helvetica,Arial,sans-serif}" +
    ".f-wrap{max-width:820px;margin:18px auto;box-shadow:0 8px 30px rgba(0,0,0,.2)}" +
    ".f-toolbar{position:sticky;top:0;z-index:20;background:#111;color:#fff;display:flex;gap:14px;align-items:center;padding:11px 18px;flex-wrap:wrap}" +
    ".f-toolbar button{background:#fff;color:#111;border:none;border-radius:6px;padding:9px 18px;font-weight:700;font-size:14px;cursor:pointer}" +
    ".f-toolbar span{font-size:12px;color:#bbb}" +
    FOLIO_CSS +
    "@page{size:A4;margin:12mm}@media print{.f-toolbar{display:none}body{background:#fff}.f-wrap{margin:0;max-width:none;box-shadow:none}.f-doc{border:none;max-width:none}.f-notas{position:fixed;top:0;right:0;bottom:0;width:120px}}" +
    "</style></head><body>" +
    '<div class="f-toolbar"><button onclick="window.print()">⇩ Guardar como PDF</button><span>Elegí "Guardar como PDF" como destino.</span></div>' +
    '<div class="f-wrap">' + fichaInnerHTML(d) + "</div>" +
    '<script>window.addEventListener("load",function(){setTimeout(function(){try{window.print()}catch(e){}},500)})<\/script>' +
    "</body></html>"
  );
}

/* ══════════════════════════════════════════════════════════════
   SYSTEM PROMPT
   ══════════════════════════════════════════════════════════════ */
const SYSTEM_PROMPT = `Sos el asistente de intake del Estudio Jurídico Szlit & Asoc. (derecho laboral argentino; representás TRABAJADORES). Recibís una ficha de intake en crudo (respuestas de Google Forms, un PDF o una imagen) y devolvés un objeto JSON con los datos ordenados, clasificados y enriquecidos con observaciones legales, listo para generar la ficha del estudio.

CLASIFICÁ:
- motivo: "Despido" | "Renuncia" | "Tengo problemas en mi trabajo" | "Cálculo liquidación" | "Otro".
- registracion: "Blanco" (registrado en regla) | "Negro" (no registrado) | "Gris" (mal registrado: fecha de ingreso o sueldo distintos a los del recibo).
- tipo_salud: "accidente" (lesión concreta por el trabajo) | "enfermedad" (enfermedad profesional) | "" (sin problema de salud).
- fue_despedido: "Sí" | "No" (SOLO si motivo = "Cálculo liquidación").

CAMPOS (incluí solo los que surjan de la ficha; omití los que no aparezcan):
Personales: nombre, apellido, celular, como_conocio, tareas, email, celular_alt, direccion, fecha_nacimiento, cuil, nacionalidad, estado_civil.
Laborales: fecha_ingreso_recibo, fecha_ingreso_real, frecuencia_cobro, forma_cobro, sueldo_actual, sueldo_real, sueldo_recibo, mejor_sueldo, ultimo_sueldo_mes, dias_trabajo, horarios, horas_extras, fecha_despido, carta_documento, telegrama_renuncia, fecha_telegrama, motivo_renuncia, problemas_detalle, motivo_detalle, empresa, direccion_trabajo.
Salud accidente: desc_accidente, fecha_accidente, atencion_medica, donde_atendio, fecha_primera_atencion, tratamiento, secuelas.
Salud enfermedad: problemas_salud, desde_cuando, tareas_problema, atencion_medica, donde_atendio, fecha_primera_atencion, tratamiento.
Otro: fecha_consulta (dd/mm/yyyy; si no está, usá la fecha de hoy).

ENRIQUECIMIENTO (imitá el criterio del estudio — ejemplo Mogollón):
- Sueldo: escribí SIEMPRE el monto primero (ej. "$550.000") y recién después una observación con guion; nunca pongas otro número antes del monto. Si el sueldo es bajo para la antigüedad/jornada: "$550.000 — MUY BAJO para X años y jornada completa: cotejar con convenio, probables diferencias".
- cuil: validá. Si es un DNI y no un CUIL, o le falta prefijo/verificador, aclaralo: "DNI 12.345.678 — NO es CUIL: falta prefijo y verificador. Pedir CUIL completo".
- Salud: reclasificá si el formulario etiquetó mal (una lesión por el trabajo cargada como "enfermedad por tareas repetitivas" es en realidad un ACCIDENTE con lesión concreta; nombrala). Si hubo falta de asistencia/medios, citá el deber de seguridad (art. 75 LCT / Ley 19.587). NO uses términos de patología preexistente/degenerativa (tendinitis, artrosis, hernia de disco); "lumbalgia" es aceptable como secuela traumática. Marcá discrepancias de fechas (p. ej. lesión hace 4 años pero primera atención hace 1).
- Situación (problemas_detalle / motivo_detalle): reconstruí el problema con el instituto de LCT pertinente cuando aplique (reducción unilateral art. 66; jornada que excede el máximo legal; relación en negro y su antigüedad).
- Datos faltantes: si falta calle/altura, la razón social del empleador, o el detalle es vago, agregalo como aclaración "(FALTA ... — completar)" / "(SIN DETALLE, ampliar)".
- Empleadores: si son personas humanas sin razón social, aclaralo.
- IMPORTANTE: los campos de FECHA van limpios y parseables (dd/mm/yyyy) y el SUELDO con el número primero; las observaciones largas sobre fechas van en el detalle, no en el campo fecha. No calcules vos la antigüedad ni el monto de liquidación (los calcula el sistema).

Devolvé EXCLUSIVAMENTE el objeto JSON, sin markdown, sin backticks, sin texto antes ni después.`;

function extractJSON(text) {
  const clean = text.replace(/```json|```/g, "").trim();
  const a = clean.indexOf("{"), b = clean.lastIndexOf("}");
  if (a === -1 || b === -1) throw new Error("Sin JSON");
  return JSON.parse(clean.slice(a, b + 1));
}
function readFile(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    const mt = file.type || "";
    const kind = mt === "application/pdf" ? "pdf" : mt.startsWith("image/") ? "image" : "text";
    r.onerror = () => reject(new Error("No se pudo leer el archivo"));
    if (kind === "text") { r.onload = () => resolve({ kind, text: r.result }); r.readAsText(file); }
    else { r.onload = () => resolve({ kind, mediaType: mt, data: String(r.result).split(",")[1] }); r.readAsDataURL(file); }
  });
}

/* ── Firebase: se carga por CDN; si no está configurado, degrada a conteo local ── */
function ymd() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function firebaseConfigured() {
  return FIREBASE_CONFIG.projectId && !FIREBASE_CONFIG.projectId.startsWith("TU_");
}
function loadFirebase() {
  return new Promise((resolve, reject) => {
    if (window.__fb) return resolve(window.__fb);
    const s = document.createElement("script");
    s.type = "module";
    s.textContent =
      'import { initializeApp } from "https://www.gstatic.com/firebasejs/' + FIREBASE_VER + '/firebase-app.js";' +
      'import { getFirestore, doc, onSnapshot, setDoc, increment } from "https://www.gstatic.com/firebasejs/' + FIREBASE_VER + '/firebase-firestore.js";' +
      'window.__fb = { initializeApp, getFirestore, doc, onSnapshot, setDoc, increment };' +
      'window.dispatchEvent(new Event("__fb_ready"));';
    window.addEventListener("__fb_ready", () => resolve(window.__fb), { once: true });
    s.onerror = () => reject(new Error("firebase load error"));
    document.head.appendChild(s);
    setTimeout(() => { if (!window.__fb) reject(new Error("firebase timeout")); }, 8000);
  });
}

/* ══════════════════════════════════════════════════════════════
   APP
   ══════════════════════════════════════════════════════════════ */
const G = {
  bg: "#f1f0ea", panel: "#ffffff", edge: "#e3e0d6", ink: "#1c1c1a", sub: "#6e6a60",
  line: "#e6e3da", accent: "#15533a", accentSoft: "#e7efe9", warn: "#8a2f1c",
};
const F_UI = "'Inter',-apple-system,system-ui,Helvetica,Arial,sans-serif";

export default function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [detail, setDetail] = useState("");
  const inputRef = useRef(null);
  const [count, setCount] = useState(0);
  const [sync, setSync] = useState("local"); // "local" | "online"
  const fbRef = useRef(null);

  useEffect(() => {
    if (!firebaseConfigured()) { setSync("local"); return; }
    let unsub;
    loadFirebase().then((fb) => {
      try {
        const app = fb.initializeApp(FIREBASE_CONFIG);
        const db = fb.getFirestore(app);
        fbRef.current = { fb, db };
        const ref = fb.doc(db, "contador_fichas", ymd());
        unsub = fb.onSnapshot(ref, (snap) => setCount(snap.exists() ? (snap.data().total || 0) : 0));
        setSync("online");
      } catch (e) { setSync("local"); }
    }).catch(() => setSync("local"));
    return () => { if (unsub) unsub(); };
  }, []);

  async function registrarGenerada() {
    if (fbRef.current && sync === "online") {
      try {
        const { fb, db } = fbRef.current;
        await fb.setDoc(fb.doc(db, "contador_fichas", ymd()), { total: fb.increment(1), fecha: ymd() }, { merge: true });
        return; // onSnapshot refresca el número
      } catch (e) { /* cae a conteo local */ }
    }
    setCount((c) => c + 1);
  }

  function nuevoFormulario() {
    setFile(null); setText(""); setData(null); setError(""); setDetail("");
    if (inputRef.current) inputRef.current.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const pick = useCallback((f) => { if (!f) return; setFile(f); setText(""); setError(""); }, []);
  const onDrop = (e) => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files && e.dataTransfer.files[0]) pick(e.dataTransfer.files[0]); };

  async function procesar() {
    if (!file && !text.trim()) return;
    setLoading(true); setError(""); setDetail(""); setData(null);
    try {
      const content = [];
      let userText = "Procesá esta ficha de intake según las reglas del sistema.";
      if (file) {
        const rf = await readFile(file);
        if (rf.kind === "pdf") content.push({ type: "document", source: { type: "base64", media_type: "application/pdf", data: rf.data } });
        else if (rf.kind === "image") content.push({ type: "image", source: { type: "base64", media_type: rf.mediaType, data: rf.data } });
        else userText = `Ficha en crudo:\n\n${rf.text}`;
      } else userText = `Ficha en crudo:\n\n${text}`;
      content.push({ type: "text", text: userText });

      const headers = { "Content-Type": "application/json" };
      if (ANTHROPIC_API_KEY) {
        headers["x-api-key"] = ANTHROPIC_API_KEY;
        headers["anthropic-version"] = "2023-06-01";
        headers["anthropic-dangerous-direct-browser-access"] = "true";
      }
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers,
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 8000, system: SYSTEM_PROMPT, messages: [{ role: "user", content }] }),
      });
      const json = await res.json();
      if (!res.ok || json.type === "error" || json.error) {
        setError("La API devolvió un error al procesar la ficha.");
        setDetail(String((json.error && json.error.message) || json.message || `HTTP ${res.status}`).slice(0, 400));
        return;
      }
      const out = (json.content || []).map((b) => (b.type === "text" ? b.text : "")).join("").trim();
      if (!out) { setError("La API no devolvió contenido. Reintentá."); setDetail("stop_reason: " + (json.stop_reason || "?")); return; }
      let parsed;
      try { parsed = extractJSON(out); }
      catch (_) {
        setError(json.stop_reason === "max_tokens"
          ? "La respuesta se cortó por longitud. Reintentá o procesá una ficha por vez."
          : "La respuesta no vino en el formato esperado. Reintentá; si persiste, copiame el detalle.");
        setDetail(out.slice(0, 500)); return;
      }
      setData(enrich(parsed));
      registrarGenerada();
    } catch (e) {
      setError("No se pudo conectar para procesar la ficha. Revisá la conexión y reintentá.");
      setDetail(String((e && e.message) || e).slice(0, 300));
    } finally { setLoading(false); }
  }

  function descargar() {
    if (!data) return;
    try {
      const blob = new Blob([buildPrintHTML(data)], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ficha-${(data.apellido || "intake").replace(/\s+/g, "_")}.html`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (e) { setError("No se pudo generar el archivo para descargar."); }
  }

  const primaryBtn = (extra = {}) => ({ fontFamily: F_UI, fontSize: 14, fontWeight: 600, border: "none", borderRadius: 7, padding: "12px 22px", background: G.accent, color: "#fff", cursor: "pointer", ...extra });
  const ghostBtn = (extra = {}) => ({ fontFamily: F_UI, fontSize: 14, fontWeight: 600, border: `1px solid ${G.accent}`, borderRadius: 7, padding: "11px 18px", background: "#fff", color: G.accent, cursor: "pointer", ...extra });

  return (
    <div style={{ fontFamily: F_UI, color: G.ink, background: G.bg, minHeight: "100vh", padding: "24px 16px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes spin{to{transform:rotate(360deg)}}
        button:focus-visible,.zone:focus-visible{outline:2px solid #15533a;outline-offset:2px}
        ${FOLIO_CSS}
      `}</style>

      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <header style={{ marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${G.edge}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", color: G.accent }}>Estudio Jurídico Szlit &amp; Asoc.</div>
            <h1 style={{ margin: "6px 0 3px", fontSize: 26, fontWeight: 700, color: G.ink }}>Procesador de fichas de intake</h1>
            <p style={{ margin: 0, fontSize: 14, color: G.sub }}>Cargá la ficha en crudo y obtené el documento del estudio, con cálculo de liquidación, listo para PDF.</p>
          </div>
          <div style={{ textAlign: "center", background: G.accentSoft, border: `1px solid ${G.accent}33`, borderRadius: 12, padding: "12px 20px", minWidth: 118 }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: G.accent, lineHeight: 1 }}>{count}</div>
            <div style={{ fontSize: 10, color: G.sub, marginTop: 4, textTransform: "uppercase", letterSpacing: 0.6 }}>fichas hoy</div>
            <div style={{ fontSize: 10, color: sync === "online" ? G.accent : G.sub, marginTop: 5 }}>{sync === "online" ? "● sincronizado" : "○ local"}</div>
          </div>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,360px) minmax(0,1fr)", gap: 20, alignItems: "start" }}>
          {/* 1 · Cargar */}
          <div style={{ background: "#fff", border: `1px solid ${G.edge}`, borderRadius: 12, padding: 20, position: "sticky", top: 16 }}>
            <StepLabel n="1" t="Cargar" />
            <div className="zone" tabIndex={0} role="button"
              onClick={() => inputRef.current && inputRef.current.click()}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current && inputRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={onDrop}
              style={{ marginTop: 14, border: `2px dashed ${drag ? G.accent : G.line}`, background: drag ? G.accentSoft : "#fafafa", borderRadius: 10, padding: "30px 18px", textAlign: "center", cursor: "pointer" }}>
              <div style={{ fontSize: 26, lineHeight: 1, color: G.accent }}>⎗</div>
              {file ? (
                <>
                  <div style={{ marginTop: 10, fontSize: 15, color: G.ink, fontWeight: 600, wordBreak: "break-all" }}>{file.name}</div>
                  <div style={{ fontSize: 12, color: G.sub, marginTop: 3 }}>Tocá para reemplazar</div>
                </>
              ) : (
                <>
                  <div style={{ marginTop: 10, fontSize: 15, fontWeight: 500 }}>Arrastrá el archivo o tocá para elegir</div>
                  <div style={{ fontSize: 12, color: G.sub, marginTop: 4 }}>PDF, imagen (foto/captura) o texto</div>
                </>
              )}
              <input ref={inputRef} type="file" accept=".pdf,image/*,.txt,.csv,text/plain" style={{ display: "none" }} onChange={(e) => pick(e.target.files && e.target.files[0])} />
            </div>

            <details style={{ marginTop: 12 }}>
              <summary style={{ cursor: "pointer", fontSize: 13, color: G.ink }}>o pegar el texto directamente</summary>
              <textarea value={text} onChange={(e) => { setText(e.target.value); setFile(null); }} placeholder="Pegá acá las respuestas del formulario..."
                style={{ width: "100%", minHeight: 120, marginTop: 10, padding: 11, fontSize: 13, fontFamily: "Menlo,Consolas,monospace", border: `1px solid ${G.line}`, borderRadius: 8, boxSizing: "border-box", resize: "vertical" }} />
            </details>

            <button onClick={procesar} disabled={loading || (!file && !text.trim())}
              style={primaryBtn({ width: "100%", marginTop: 14, opacity: loading || (!file && !text.trim()) ? 0.5 : 1, cursor: loading || (!file && !text.trim()) ? "default" : "pointer" })}>
              {loading ? "Procesando…" : "Procesar ficha"}
            </button>
            {error && <p style={{ color: G.warn, fontSize: 13, marginTop: 12, lineHeight: 1.5 }}>{error}</p>}
            {detail && (
              <details style={{ marginTop: 6 }}>
                <summary style={{ cursor: "pointer", fontSize: 12, color: G.sub }}>Ver detalle técnico</summary>
                <pre style={{ marginTop: 6, whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: 11.5, color: G.sub, background: "#fafafa", border: `1px solid ${G.line}`, borderRadius: 6, padding: 10, maxHeight: 180, overflow: "auto" }}>{detail}</pre>
              </details>
            )}
          </div>

          {/* 2 · Ficha */}
          <div style={{ background: "#fff", border: `1px solid ${G.edge}`, borderRadius: 12, padding: 20, minHeight: 340 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
              <StepLabel n="2" t="Ficha" />
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {data && <button onClick={nuevoFormulario} style={ghostBtn()}>+ Nuevo formulario</button>}
                {data && <button onClick={descargar} style={primaryBtn()}>Descargar ficha ↓</button>}
              </div>
            </div>

            {loading ? (
              <div style={{ textAlign: "center", padding: "70px 0", color: G.sub }}>
                <div style={{ width: 32, height: 32, border: `3px solid ${G.line}`, borderTopColor: G.accent, borderRadius: "50%", margin: "0 auto 14px", animation: "spin .8s linear infinite" }} />
                <div style={{ fontSize: 14 }}>Leyendo, clasificando y calculando…</div>
              </div>
            ) : data ? (
              <div style={{ overflow: "auto", background: "#f3f3f3", padding: 14, borderRadius: 8 }}>
                <div dangerouslySetInnerHTML={{ __html: fichaInnerHTML(data) }} />
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "70px 20px", color: G.sub }}>
                <div style={{ fontSize: 17, color: "#b3b3b3" }}>La ficha aparecerá acá.</div>
                <div style={{ fontSize: 13, marginTop: 6 }}>Cargá un archivo y tocá <b style={{ color: G.ink }}>Procesar ficha</b>.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepLabel({ n, t }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", background: G.accent, width: 25, height: 25, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{n}</span>
      <span style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: G.accent, fontWeight: 600 }}>{t}</span>
    </div>
  );
}
