"use client";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Store,
  ShoppingCart,
  PackageOpen,
  Wrench,
  Rocket,
  Box,
  Sliders,
  Pencil,
  Trash2,
  Link2,
  Hexagon,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Cpu,
  ArrowLeft,
  DollarSign,
  StepForward,
} from "lucide-react";

/** Shop-first + Sequential Wizard (SparkFun/Adafruit vibe)
 * Flow: Shop → Wizard (Platform → Power → Circuit → Motors → Peripherals → Review) → Cart
 * - Bulky cannot be amphibious (always Land-only; no water kit prompt)
 * - Unique categories (battery, circuit, motor) use REPLACE behavior in wizard
 * - Auxiliary components appear as "Articles" on the Shop bottom list
 * - Hex Linker kept minimal (GPS demo)
 * - Self-tests preserved and expanded
 */

// -------------------- 1) DATA --------------------
const CATALOG = {
  schema: "asce.v1",
  currency: "USD",
  platforms: [
    { id: "thegill", title: "ASCE Thegill", tags: ["Amphibious", "4×DC"], compat: { buoyancy_kg: 4.0 }, defaults: { struts: true, finned: true, gearboxes: true, landOnly: false }, price: 279, img: "thegill" },
    { id: "bulky", title: "ASCE Bulky", tags: ["Stackable", "Outer shell (VDrop)"], compat: { max_layers: 6 }, defaults: { landOnly: true }, price: 249, img: "bulky" },
  ],
  modules: [
    // Batteries
    { id: "bat_3s_5200_25c", category: "battery", title: "3S LiPo 5200mAh 25C", compat: { S: 3, capacity_mAh: 5200, C_cont: 25, has_BMS: false }, price: 39, img: "battery" },
    { id: "bat_4s_2200_tg", category: "battery", title: "4S LiPo 2200mAh 30C", compat: { S: 4, capacity_mAh: 2200, C_cont: 30, has_BMS: false }, price: 29, img: "battery" },

    // Circuits
    { id: "giller", category: "circuit", title: "Giller (Thegill)", compat: { input_S_min: 3, input_S_max: 5, reg_5V_A: 2.0, motor_channels: 4 }, price: 59, img: "circuit" },
    { id: "bulker", category: "circuit", title: "Bulker (Bulky)", compat: { input_S_min: 3, input_S_max: 4, reg_5V_A: 2.0, motor_channels: 4 }, price: 59, img: "circuit" },

    // Drivers
    { id: "asce_dds", category: "driver", title: "ASCE DDS (30A/60V)", compat: { channels: 1, cont_A_per_ch: 30 }, price: 35, img: "driver" },

    // Motors (unique as sets)
    { id: "tt_motor", category: "motor", title: "TT Motor Set (x4)", compat: { nominal_V_min: 3, nominal_V_max: 6, cont_A: 0.6 }, price: 22, img: "motor" },
    { id: "tg_johnson_48", category: "motor", title: "TG Johnson 48:1 Set (x4)", compat: { nominal_V_min: 6, nominal_V_max: 20, cont_A: 3.0 }, price: 99, img: "motor" },
    { id: "tg_johnson_48_enc", category: "motor", title: "TG Johnson 48:1 Encoder Set (x4)", compat: { nominal_V_min: 6, nominal_V_max: 20, cont_A: 3.0, encoder: true }, price: 139, img: "motor" },

    // Servo & Peripherals (multi)
    { id: "mecha_johnson_270", category: "servo", title: "Mecha Johnson Servo (270°)", compat: { V_min: 6, V_max: 7.4, stall_A: 3.0 }, price: 42, img: "servo" },
    { id: "gill_lights", category: "peripheral", title: "Thegill Lights", compat: { interface: "gpio", current_5v_mA: 150 }, price: 12, img: "lights" },
    { id: "bulky_oled", category: "peripheral", title: "Bulky OLED", compat: { interface: "i2c", current_5v_mA: 100 }, price: 19, img: "oled" },
    { id: "gps_module", category: "peripheral", title: "ASCE u-blox GPS", compat: { interface: "uart", current_5v_mA: 80 }, price: 25, img: "gps" },

    // Adapters
    { id: "adp_gill_tt", category: "adapter", title: "Thegill TT Motor Adapter", price: 7, img: "adapter" },
    { id: "adp_gill_mechiane", category: "adapter", title: "Thegill Mech’iane Adapter", price: 9, img: "adapter" },

    // Services
    { id: "svc_assembly", category: "service", title: "Assembly & Firmware Flash", price: 29, img: "service" },
    { id: "kit_waterproof_gill", category: "service", title: "Thegill Waterproofing Kit & Test", price: 19, img: "service" },
  ],
  presets: [
    { id: "gill_rapht", platformId: "thegill", title: "Thegill – Rapht (Amphibious)", includes: ["giller", "bat_4s_2200_tg", "kit_waterproof_gill", "gill_lights"], price: 349, img: "thegill" },
    { id: "bulky_bare", platformId: "bulky", title: "Bulky – Bare", includes: ["bulker", "bulky_oled", "bat_3s_5200_25c"], price: 319, img: "bulky" },
  ],
};

const PLATFORM_RULES = {
  thegill: {
    allow: ["giller","bat_3s_5200_25c","bat_4s_2200_tg","tt_motor","tg_johnson_48","tg_johnson_48_enc","gill_lights","gps_module","mecha_johnson_270","kit_waterproof_gill","asce_dds"],
    adapterFor: { tt_motor: "adp_gill_tt", mecha_johnson_270: "adp_gill_mechiane" },
  },
  bulky: {
    allow: ["bulker","bat_3s_5200_25c","bulky_oled","gps_module","tt_motor","tg_johnson_48","asce_dds"],
    adapterFor: {},
  },
};

// Unique categories
const UNIQUE_CATS = ["battery","circuit","motor"];

// -------------------- 2) HELPERS --------------------
const byId = (arr, id) => arr.find((x) => x.id === id);
const uniq = (arr) => Array.from(new Set(arr));
const fmtA = (a) => `${a.toFixed(1)} A`;
const listModules = (catalog, ids) => ids.map((id) => byId(catalog.modules, id)).filter(Boolean);
const filterInventory = (catalog, platformId, expert) => expert ? catalog.modules : catalog.modules.filter((m)=>PLATFORM_RULES[platformId]?.allow.includes(m.id));
const adapterFor = (platformId, moduleId) => PLATFORM_RULES[platformId]?.adapterFor?.[moduleId] || null;
const selectedOfCat = (catalog, selected, cat) => listModules(catalog, selected).filter((m)=>m.category===cat);

// REPLACE strategy for unique categories in wizard
function replaceUnique(builder, catalog, moduleId){
  const m = byId(catalog.modules,moduleId);
  if(!m) return builder;
  if(!UNIQUE_CATS.includes(m.category)){
    const adp=adapterFor(builder.platformId,moduleId);
    return { ...builder, selected: uniq([...(adp?[adp]:[]),...builder.selected,moduleId]) };
  }
  const keep = listModules(catalog,builder.selected).filter(x=>x.category!==m.category).map(x=>x.id);
  const adp=adapterFor(builder.platformId,moduleId);
  const next = uniq([...(adp?[adp]:[]),...keep,moduleId]);
  return { ...builder, selected: next };
}

function calcLoads(catalog, selected){
  const mods = listModules(catalog, selected);
  const motors = mods.filter(m=>m.category==="motor").reduce((s,m)=>s+(m.compat?.cont_A||0),0);
  const fiveV = mods.filter(m=>m.category==="peripheral").reduce((s,p)=>s+((p.compat?.current_5v_mA||0)/1000),0);
  return { motors_A: motors, fiveV_A: fiveV };
}

function batteryOf(catalog, selected){ return listModules(catalog, selected).find(m=>m.category==="battery"); }
function circuitOf(catalog, selected){ return listModules(catalog, selected).find(m=>m.category==="circuit"); }

function evaluate(platform, selected, catalog, flags){
  const issues=[]; const loads=calcLoads(catalog, selected);
  const bat=batteryOf(catalog, selected); const circ=circuitOf(catalog, selected);
  if(bat&&circ){ const S=bat.compat.S, min=circ.compat.input_S_min, max=circ.compat.input_S_max; if(S<min||S>max){ issues.push({sev:"R",msg:`Battery ${S}S incompatible with ${circ.title} (${min}–${max}S)`}); }}
  if(bat){ const maxC=(bat.compat.capacity_mAh/1000)*(bat.compat.C_cont||10); const total=loads.motors_A+loads.fiveV_A+0.2; if(total>maxC) issues.push({sev:"R",msg:`Loads ${fmtA(total)} exceed battery ${fmtA(maxC)}`}); else if(total>0.9*maxC) issues.push({sev:"Y",msg:`Loads ${fmtA(total)} near battery ${fmtA(maxC)}`}); }
  if(circ){ const cap=circ.compat.reg_5V_A||0; const used=loads.fiveV_A; if(used>cap) issues.push({sev:"R",msg:`5V rail overloaded (${fmtA(used)}/${fmtA(cap)})`}); else if(used>0.9*cap) issues.push({sev:"Y",msg:`5V rail near limit (${fmtA(used)}/${fmtA(cap)})`}); }
  if(platform.id==="thegill" && !flags.landOnly && !selected.includes("kit_waterproof_gill")) issues.push({sev:"Y",msg:"Add Waterproofing Kit for Water ✓"});
  // Bulky cannot be amphibious; ensure landOnly true
  if(platform.id==="bulky" && flags.landOnly!==true) issues.push({sev:"Y",msg:"Bulky is land-only; amphibious disabled"});
  const status = issues.find(i=>i.sev==="R")?"R":issues.find(i=>i.sev==="Y")?"Y":"G";
  return { issues, status, loads };
}

// Wizard step descriptors
const WIZ_STEPS = [
  { id:"platform", title:"Platform" },
  { id:"battery", title:"Power" },
  { id:"circuit", title:"Circuit" },
  { id:"motor", title:"Motors" },
  { id:"peripheral", title:"Peripherals (optional)" },
  { id:"review", title:"Review" },
];

function stepIndex(id){ return WIZ_STEPS.findIndex(s=>s.id===id); }

// -------------------- 3) APP --------------------
const VIEWS={ SHOP:"SHOP", WIZARD:"WIZARD", CART:"CART", BUILDS:"BUILDS", LINKER:"LINKER" };

export default function App(){
  const [expert,setExpert]=useState(false);
  const [view,setView]=useState(VIEWS.SHOP);
  const [cart,setCart]=useState([]);
  const [builds,setBuilds]=useState([]);
  const [wizard,setWizard]=useState({ step:"platform", builder:null });

  const goto=(v)=>setView(v);
  const addComponent=(id)=>setCart(c=>[...c,{type:"component",id,title:byId(CATALOG.modules,id)?.title,qty:1}]);
  const addPreset=(p,assembled)=>setCart(c=>[...c,{type:"platform",platformId:p.platformId,title:p.title+(assembled?" (Assembled)":" (Kit)"),bom:[...p.includes,...(assembled?["svc_assembly"]:[])],assembled,qty:1}]);

  const startWizard=(platformId)=>{
    const pf = byId(CATALOG.platforms,platformId);
    const flags = { ...(pf.defaults||{}) };
    // Force landOnly for Bulky
    if(pf.id==="bulky") flags.landOnly = true;
    setWizard({ step:"battery", builder:{ platformId:pf.id, selected:[], flags } });
    setView(VIEWS.WIZARD);
  };

  const applyWizardAdd=(moduleId)=>setWizard(w=>({ ...w, builder: replaceUnique(w.builder, CATALOG, moduleId) }));
  const removeFromWizard=(moduleId)=>setWizard(w=>({ ...w, builder:{ ...w.builder, selected: w.builder.selected.filter(x=>x!==moduleId) } }));

  const canProceed=(step,builder)=>{
    if(step==="battery") return selectedOfCat(CATALOG,builder.selected,"battery").length>0;
    if(step==="circuit") return selectedOfCat(CATALOG,builder.selected,"circuit").length>0;
    if(step==="motor") return selectedOfCat(CATALOG,builder.selected,"motor").length>0;
    return true;
  };

  const nextStep=()=>setWizard(w=>{ const idx=stepIndex(w.step); const next=WIZ_STEPS[Math.min(idx+1,WIZ_STEPS.length-1)].id; return { ...w, step: next }; });
  const prevStep=()=>setWizard(w=>{ const idx=stepIndex(w.step); const prev=WIZ_STEPS[Math.max(idx-1,0)].id; return { ...w, step: prev }; });

  const saveWizard=(assembled)=>{
    const pf=byId(CATALOG.platforms,wizard.builder.platformId);
    const bom=[...wizard.builder.selected, ...(assembled?["svc_assembly"]:[])];
    setCart(c=>[...c,{type:"platform",platformId:pf.id,title:`${pf.title} (Custom ${assembled?"Assembled":"Kit"})`,bom,assembled,qty:1}]);
    setBuilds(bs=>[...bs,{id:`b_${Date.now()}`,title:`${pf.title} — saved`,platformId:pf.id,selected:[...wizard.builder.selected],flags:{...wizard.builder.flags}}]);
    setView(VIEWS.CART);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4">
      <TopNav expert={expert} onToggle={setExpert} cartCount={cart.length} onShop={()=>goto(VIEWS.SHOP)} onCart={()=>goto(VIEWS.CART)} onBuilds={()=>goto(VIEWS.BUILDS)} onLinker={()=>goto(VIEWS.LINKER)} />

      {view===VIEWS.SHOP && (
        <ShopView catalog={CATALOG} onStartWizard={startWizard} onAddPreset={addPreset} onAddComponent={addComponent} />
      )}

      {view===VIEWS.WIZARD && wizard.builder && (
        <WizardView catalog={CATALOG} expert={expert} wiz={wizard} onPrev={prevStep} onNext={nextStep} canProceed={canProceed} onAdd={applyWizardAdd} onRemove={removeFromWizard} onSave={saveWizard} onExit={()=>setView(VIEWS.SHOP)} />
      )}

      {view===VIEWS.CART && (
        <CartView cart={cart} onBack={()=>goto(VIEWS.SHOP)} onRemove={(i)=>setCart(c=>c.filter((_,idx)=>idx!==i))} />
      )}

      {view===VIEWS.BUILDS && (
        <BuildsView builds={builds} onBack={()=>goto(VIEWS.SHOP)} />
      )}

      {view===VIEWS.LINKER && (
        <LinkerView builds={builds} onBack={()=>goto(VIEWS.SHOP)} />
      )}

      <SelfTests />
    </div>
  );
}

// -------------------- 4) UI --------------------
function TopNav({expert,onToggle,cartCount,onShop,onCart,onBuilds,onLinker}){
  return (
    <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-2">
        <Hexagon className="w-5 h-5"/>
        <div className="text-xl font-bold">ASCE Platforms</div>
        <Badge variant="outline">Shop Prototype</Badge>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onShop}><Store className="w-4 h-4 mr-1"/>Shop</Button>
        <Button variant="ghost" size="sm" onClick={onBuilds}><PackageOpen className="w-4 h-4 mr-1"/>My Builds</Button>
        <Button variant="ghost" size="sm" onClick={onLinker}><Link2 className="w-4 h-4 mr-1"/>Link</Button>
        <div className="flex items-center gap-2 text-sm">
          <Sliders className="w-4 h-4"/>
          <span>Expert</span>
          <Switch checked={expert} onCheckedChange={onToggle}/>
        </div>
        <Button onClick={onCart}><ShoppingCart className="w-4 h-4 mr-1"/>Cart ({cartCount})</Button>
      </div>
    </div>
  );
}

function ImgPh({label}){ return (<div className="bg-slate-200 rounded-lg w-full aspect-[4/3] flex items-center justify-center text-[10px] text-slate-600">{label}</div>); }
function PriceTag({price}){ return (<div className="flex items-center gap-1 text-sm font-semibold"><DollarSign className="w-4 h-4"/>{price}</div>); }

// SHOP: Featured Platforms + Auxiliary Articles (bottom)
function ShopView({catalog,onStartWizard,onAddPreset,onAddComponent}){
  const articles = catalog.modules.filter(m=>!['adapter','service'].includes(m.category));
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {catalog.platforms.map((pf)=>(
          <Card key={pf.id} className="p-3">
            <ImgPh label={pf.img}/>
            <CardContent className="p-0 mt-2 text-sm font-semibold">{pf.title}</CardContent>
            <div className="mt-1 flex flex-wrap gap-1">{pf.tags.map((t,i)=>(<Badge key={i} variant="secondary">{t}</Badge>))}</div>
            <CardFooter className="p-0 mt-2 flex items-center justify-between">
              <PriceTag price={pf.price}/>
              <Button size="sm" onClick={()=>onStartWizard(pf.id)}><StepForward className="w-4 h-4 mr-1"/>Build</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Popular presets row (add to cart fast) */}
      <div>
        <div className="flex items-center justify-between mb-2"><div className="font-semibold text-sm">Popular Kits</div><Badge variant="outline">Quick add</Badge></div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {catalog.presets.map((p)=>(
            <Card key={p.id} className="p-3">
              <ImgPh label={p.img}/>
              <CardContent className="p-0 mt-2 text-sm font-semibold">{p.title}</CardContent>
              <div className="text-[11px] text-muted-foreground">Includes: {p.includes.join(", ")}</div>
              <CardFooter className="p-0 mt-2 flex items-center justify-between">
                <PriceTag price={p.price}/>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" onClick={()=>onAddPreset(p,false)}>Add Kit</Button>
                  <Button size="sm" variant="outline" onClick={()=>onAddPreset(p,true)}>Assembled</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Auxiliary Articles */}
      <div>
        <div className="font-semibold text-sm mb-2">Articles (Batteries, Circuits, Motors, Peripherals)</div>
        <Tabs defaultValue="battery" className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            {"battery,circuit,motor,peripheral".split(",").map((c)=>(<TabsTrigger key={c} value={c} className="capitalize">{c}</TabsTrigger>))}
          </TabsList>
          {"battery,circuit,motor,peripheral".split(",").map((c)=>(
            <TabsContent key={c} value={c}>
              <ScrollArea className="h-72 pr-4">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {articles.filter(m=>m.category===c).map((m)=>(
                    <Card key={m.id} className="p-3">
                      <ImgPh label={m.img}/>
                      <CardContent className="p-0 mt-2 text-sm font-semibold">{m.title}</CardContent>
                      <div className="text-xs text-muted-foreground">{m.category}</div>
                      <CardFooter className="p-0 mt-2 flex items-center justify-between">
                        <PriceTag price={m.price}/>
                        <Button size="sm" onClick={()=>onAddComponent(m.id)}><PackageOpen className="w-4 h-4 mr-1"/>Add</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

// WIZARD --------------------------------------------------
function WizardView({catalog,expert,wiz,onPrev,onNext,canProceed,onAdd,onRemove,onSave,onExit}){
  const platform = byId(catalog.platforms,wiz.builder.platformId);
  const invAll = filterInventory(catalog,wiz.builder.platformId,expert);
  const {issues,status,loads}=useMemo(()=>evaluate(platform,wiz.builder.selected,catalog,wiz.builder.flags),[platform,wiz.builder,catalog]);

  const step = wiz.step;
  const gated = (id)=>{
    if(id==='review') return true;
    return step===id;
  };

  const categoryForStep = { battery:'battery', circuit:'circuit', motor:'motor', peripheral:'peripheral' }[step];
  const items = categoryForStep ? invAll.filter(m=>m.category===categoryForStep) : [];

  const badges = useMemo(()=>{ const bat=batteryOf(catalog,wiz.builder.selected); const circ=circuitOf(catalog,wiz.builder.selected); const list=[]; if(circ) list.push(`${circ.compat?.motor_channels||0}× DC`); if(bat) list.push(`${bat.compat?.S}S ${bat.compat?.has_BMS?"Li-ion(BMS)":"LiPo"}`); list.push((platform.id==="bulky"||wiz.builder.flags.landOnly)?"Land-only":"Amphibious"); return list; },[wiz.builder,catalog]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <Button variant="ghost" size="sm" onClick={onExit}><ArrowLeft className="w-4 h-4 mr-1"/>Exit</Button>
        <div className="text-sm font-semibold">Build: {platform.title}</div>
        <div/>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {WIZ_STEPS.map((s,i)=>{
            const active = s.id===step; const done = i<stepIndex(step);
            return <Badge key={s.id} variant={active?"default":done?"secondary":"outline"}>{i+1}. {s.title}</Badge>;
          })}
        </div>
        <Separator className="mb-3"/>

        {gated('platform') && (
          <div className="text-sm">Platform locked to <b>{platform.title}</b>. {platform.id==="bulky" && <Badge variant="outline" className="ml-2">Land-only</Badge>}</div>
        )}

        {gated('battery') && (
          <StepGrid title="Choose Power" note="Pick one battery (you can change later)." items={items} onAdd={onAdd} onRemove={onRemove} builder={wiz.builder} replace unique category="battery" />
        )}

        {gated('circuit') && (
          <StepGrid title="Choose Circuit" note="Pick one controller board." items={items} onAdd={onAdd} onRemove={onRemove} builder={wiz.builder} replace unique category="circuit" />
        )}

        {gated('motor') && (
          <StepGrid title="Choose Motor Set" note="Pick one motor set; adapters auto-add if needed." items={items} onAdd={onAdd} onRemove={onRemove} builder={wiz.builder} replace unique category="motor" />
        )}

        {gated('peripheral') && (
          <StepGrid title="Peripherals (optional)" note="Add any extras you like." items={items} onAdd={onAdd} onRemove={onRemove} builder={wiz.builder} />
        )}

        {gated('review') && (
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="text-sm font-semibold mb-2">Status</div>
              <HexHUD status={status} badges={badges} />
              <div className="text-sm grid gap-2 mt-2">
                <div className="flex items-center justify-between"><span>5V peripherals</span><span className="font-medium">{fmtA(loads.fiveV_A)}</span></div>
                <div className="flex items-center justify-between"><span>Motors (cont)</span><span className="font-medium">{fmtA(loads.motors_A)}</span></div>
              </div>
              <Separator className="my-3"/>
              <div className="font-semibold text-sm mb-2">Compatibility</div>
              <div className="flex flex-col gap-2">
                {issues.length===0 && <div className="text-sm text-emerald-700 flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/>All checks passed</div>}
                {issues.map((iss,i)=>(<Issue key={i} issue={iss}/>))}
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-sm font-semibold mb-2">Selected Modules</div>
              <div className="grid sm:grid-cols-2 gap-2">
                {wiz.builder.selected.map((id)=>{ const m=byId(catalog.modules,id); if(!m) return null; return (
                  <div key={id} className="flex items-center justify-between p-2 rounded-lg bg-white border">
                    <div className="text-sm"><div className="font-medium">{m.title}</div><div className="text-xs text-muted-foreground">{m.category}</div></div>
                    <Button size="sm" variant="ghost" onClick={()=>onRemove(id)}><Trash2 className="w-4 h-4"/></Button>
                  </div>
                );})}
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="secondary" onClick={()=>onSave(false)}><PackageOpen className="w-4 h-4 mr-1"/>Add to Cart (Kit)</Button>
                <Button variant="outline" onClick={()=>onSave(true)}><Wrench className="w-4 h-4 mr-1"/>Add to Cart (Assembled)</Button>
              </div>
            </Card>
          </div>
        )}

        {/* Nav controls */}
        <Separator className="my-3"/>
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onPrev} disabled={wiz.step==='platform'}><ArrowLeft className="w-4 h-4 mr-1"/>Back</Button>
          {wiz.step!=="review" ? (
            <Button size="sm" onClick={onNext} disabled={!canProceed(wiz.step,wiz.builder)}>Next</Button>
          ) : (
            <div className="text-xs text-muted-foreground">Ready to add to cart above.</div>
          )}
        </div>
      </Card>
    </div>
  );
}

function StepGrid({title,note,items,onAdd,onRemove,builder,unique}){
  const selectedIds = builder.selected;
  const cat = items[0]?.category;
  const current = listModules(CATALOG, selectedIds).find(m=>m.category===cat);
  return (
    <div>
      <div className="flex items-center justify-between"><div className="font-semibold text-sm">{title}</div>{note && <div className="text-xs text-muted-foreground">{note}</div>}</div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
        {items.map((m)=>{
          const added = selectedIds.includes(m.id);
          const showReplace = unique && current && !added;
          return (
            <Card key={m.id} className="p-3">
              <ImgPh label={m.img}/>
              <CardContent className="p-0 mt-2 text-sm font-semibold">{m.title}</CardContent>
              <div className="text-[11px] text-muted-foreground">{m.category}</div>
              <CardFooter className="p-0 mt-2 flex items-center justify-between">
                <PriceTag price={m.price}/>
                {added ? (
                  <Badge variant="secondary">Selected</Badge>
                ) : showReplace ? (
                  <Button size="sm" onClick={()=>onAdd(m.id)}>Replace</Button>
                ) : (
                  <Button size="sm" onClick={()=>onAdd(m.id)}>Add</Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function HexHUD({status,badges}){
  const color = status==="R"?"bg-red-500":status==="Y"?"bg-amber-500":"bg-emerald-500";
  return (
    <div className="relative w-56 h-48 mx-auto">
      <div className={`absolute inset-0 ${color} opacity-70 clip-hex shadow-lg`}/>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        {status==="G"&&<CheckCircle2 className="w-8 h-8 mb-1"/>}
        {status==="Y"&&<AlertTriangle className="w-8 h-8 mb-1"/>}
        {status==="R"&&<XCircle className="w-8 h-8 mb-1"/>}
        <div className="text-sm font-medium">Build Status</div>
        <div className="flex flex-wrap gap-1 mt-2 justify-center max-w-[200px]">{badges.map((b,i)=>(<Badge variant="secondary" key={i}>{b}</Badge>))}</div>
      </div>
      <style>{`.clip-hex{clip-path:polygon(25% 5%,75% 5%,100% 50%,75% 95%,25% 95%,0% 50%);}`}</style>
    </div>
  );
}

const Issue=({issue})=> (
  <div className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border">
    {(issue.sev==="R"? <XCircle className="w-4 h-4 text-red-600"/>: <AlertTriangle className="w-4 h-4 text-amber-600"/>)}
    <div className="text-sm flex-1">{issue.msg}</div>
  </div>
);

function CartView({cart,onBack,onRemove}){
  return (
    <div className="max-w-5xl mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-2"><ArrowLeft className="w-4 h-4 mr-1"/>Back to Shop</Button>
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3"><ShoppingCart className="w-4 h-4"/><div className="font-semibold text-sm">Cart</div></div>
        {cart.length===0 && <div className="text-sm text-muted-foreground">Your cart is empty.</div>}
        <div className="grid gap-2">
          {cart.map((it,idx)=>(
            <div key={idx} className="flex items-center justify-between p-2 border rounded-lg bg-white">
              <div className="text-sm">
                <div className="font-medium">{it.title || it.id}</div>
                <div className="text-xs text-muted-foreground">{it.type==='platform'?`Bundle • ${it.assembled?'Assembled':'Kit'} • ${it.bom.length} items`:'Component'}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Qty {it.qty}</Badge>
                <Button size="sm" variant="ghost" onClick={()=>onRemove(idx)}><Trash2 className="w-4 h-4"/></Button>
              </div>
            </div>
          ))}
        </div>
        {cart.length>0 && (<div className="mt-3 flex justify-end"><Button><ShoppingCart className="w-4 h-4 mr-1"/>Checkout (demo)</Button></div>)}
      </Card>
    </div>
  );
}

function BuildsView({builds,onBack}){
  return (
    <div className="max-w-5xl mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-2"><ArrowLeft className="w-4 h-4 mr-1"/>Back to Shop</Button>
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3"><PackageOpen className="w-4 h-4"/><div className="font-semibold text-sm">My Builds</div></div>
        {builds.length===0 && <div className="text-sm text-muted-foreground">No builds yet. Use the wizard to add one.</div>}
        <div className="grid gap-2">
          {builds.map((b)=>(
            <div key={b.id} className="p-2 border rounded-lg bg-white">
              <div className="text-sm font-medium">{b.title}</div>
              <div className="text-xs text-muted-foreground">Platform: {b.platformId} • Modules: {b.selected.join(", ")}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function LinkerView({builds,onBack}){
  const [a,setA]=useState("");
  const [b,setB]=useState("");
  const A=builds.find(x=>x.id===a); const B=builds.find(x=>x.id===b);
  const canLink = A && B && A.id!==B.id;
  const aGPS=A?.selected.includes("gps_module"); const bGPS=B?.selected.includes("gps_module");
  const status=!canLink?"Y":(aGPS&&bGPS?"G":"Y");
  return (
    <div className="max-w-5xl mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-2"><ArrowLeft className="w-4 h-4 mr-1"/>Back to Shop</Button>
      <Card className="p-4">
        <div className="text-sm font-semibold mb-3">Hex Linker (GPS demo)</div>
        <div className="grid md:grid-cols-2 gap-4">
          <select className="w-full p-2 border rounded-md" value={a} onChange={(e)=>setA(e.target.value)}>
            <option value="">— Platform A —</option>
            {builds.map((b)=>(<option key={b.id} value={b.id}>{b.title}</option>))}
          </select>
          <select className="w-full p-2 border rounded-md" value={b} onChange={(e)=>setB(e.target.value)}>
            <option value="">— Platform B —</option>
            {builds.map((b)=>(<option key={b.id} value={b.id}>{b.title}</option>))}
          </select>
        </div>
        <div className="mt-3 text-xs">Status: {status==="G"?"GPS ready":!canLink?"Pick two different platforms":"Add GPS to both builds"}</div>
        <div className="mt-3"><Button disabled={!canLink || status!=="G"}><Link2 className="w-4 h-4 mr-1"/>Create GPS Link</Button></div>
      </Card>
    </div>
  );
}

// -------------------- 5) SELF-TESTS --------------------
function SelfTests(){
  const tests=[
    // Original tests preserved
    {name:"S-range ok (Giller + 3S)", run:()=>{ const p=byId(CATALOG.platforms,"thegill"); const sel=["giller","bat_3s_5200_25c"]; return evaluate(p,sel,CATALOG,{landOnly:true}).status==="G"; }},
    {name:"Add water kit when amphibious", run:()=>{ const p=byId(CATALOG.platforms,"thegill"); const sel=["giller","bat_4s_2200_tg"]; const e=evaluate(p,sel,CATALOG,{landOnly:false}); return e.status==="Y" && e.issues.some(i=>i.msg.includes("Water")); }},
    {name:"Auto-adapter added (TT on Thegill)", run:()=>{ const simulateAdd=(pid,mid,sel=[])=>uniq([...(adapterFor(pid,mid)?[adapterFor(pid,mid)]:[]),...sel,mid]); const out=simulateAdd("thegill","tt_motor",[]); return out.includes("tt_motor") && out.includes("adp_gill_tt"); }},
    {name:"Battery S-range mismatch flagged", run:()=>{ const fakeCat={...CATALOG,modules:[...CATALOG.modules,{id:"fakeCirc",category:"circuit",title:"Fake",compat:{input_S_min:4,input_S_max:4,reg_5V_A:2.0,motor_channels:4}}]}; const p=byId(CATALOG.platforms,"thegill"); const e=evaluate(p,["fakeCirc","bat_3s_5200_25c"],fakeCat,{landOnly:true}); return e.status==="R"; }},

    // New tests for wizard logic
    {name:"Wizard gating: no Next on empty battery", run:()=>{ const b={platformId:"thegill",selected:[],flags:{landOnly:true}}; return (selectedOfCat(CATALOG,b.selected,"battery").length===0) && (false===canProceedForTest("battery",b)); }},
    {name:"Bulky is land-only", run:()=>{ const p=byId(CATALOG.platforms,"bulky"); const e=evaluate(p,["bulker","bat_3s_5200_25c"],CATALOG,{landOnly:false}); return e.issues.some(i=>i.msg.includes("land-only")); }},
    {name:"Unique REPLACE: motor set switches", run:()=>{ const b0={platformId:"thegill",selected:["tt_motor"],flags:{landOnly:true}}; const b1=replaceUnique(b0,CATALOG,"tg_johnson_48"); const sel=listModules(CATALOG,b1.selected).filter(m=>m.category==='motor').map(m=>m.id); return sel.length===1 && sel[0]==='tg_johnson_48'; }},
  ];

  // Helper to test gating
  function canProceedForTest(step,builder){
    if(step==="battery") return selectedOfCat(CATALOG,builder.selected,"battery").length>0;
    if(step==="circuit") return selectedOfCat(CATALOG,builder.selected,"circuit").length>0;
    if(step==="motor") return selectedOfCat(CATALOG,builder.selected,"motor").length>0;
    return true;
  }

  const passed = tests.filter(t=>t.run()).length;
  return (
    <div className="max-w-7xl mx-auto mt-6">
      <Card className="p-3">
        <div className="text-xs">Self-tests: {passed}/{tests.length} passed</div>
        <div className="mt-1 grid gap-1 text-[11px]">
          {tests.map((t,i)=>(<div key={i} className={t.run()?"text-emerald-700":"text-red-600"}>{t.run()?"✓":"✗"} {t.name}</div>))}
        </div>
      </Card>
    </div>
  );
}
