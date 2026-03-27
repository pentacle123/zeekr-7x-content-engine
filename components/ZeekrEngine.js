"use client";
import { useState, useCallback, useEffect } from "react";

const FONT = `'Pretendard Variable','Pretendard','Apple SD Gothic Neo',sans-serif`;
const MAX_W = 1120, PX = 48;

/* ═══ USP DATA ═══ */
const USPS = [
  { id:"charge",icon:"⚡",label:"800V 초고속충전",tag:"10→80% 13분",sub:"편의점 컵라면 익기도 전에 충전 끝",c:"#3b82f6",specs:["900V 플랫폼","480kW DC","골든 배터리"],tier:1,opp:97,search:"전기차 충전 속도 월 48,200건",insight:"한국 EV 구매 장벽 1위 = 충전 시간. 테슬라 대비 2배 빠른 충전은 가장 강력한 전환 포인트",
    ctx:{who:["장거리 출퇴근자","전기차 전환 고민자","충전 스트레스 경험자","주말 로드트립 가족"],when:["충전소 대기 시간","장거리 운전 직전","주유 습관 비교 시점"],where:["고속도로 휴게소","편의점 앞 충전소","아파트 지하 충전기"],pain:["충전 30분 대기 지루함","장거리 중 충전 불안","급속 충전기 부족"],need:["주유만큼 빠른 충전","충전 스트레스 제로","일상 방해 없는 충전"],interest:["전기차 충전","테크 리뷰","가성비 비교"]} },
  { id:"safety",icon:"🛡️",label:"Euro NCAP 5★",tag:"성인91%",sub:"별점이 아닌 가족의 안전",c:"#0ea5e9",specs:["2GPa 초고장력","윈도우 브레이커"],tier:1,opp:95,search:"중국 전기차 안전 월 32,100건",insight:"중국차 = 불안이라는 인식을 정면 돌파할 유일한 USP. 한국 소비자 신뢰 전환의 핵심",
    ctx:{who:["어린 자녀 부모","가족 안전 최우선 구매자","사고 경험자"],when:["자녀 등하원","가족 여행","비/눈 오는 날"],where:["스쿨존","고속도로","좁은 골목"],pain:["중국차 안전 불신","별5개 실제는?","아이 태우면 불안"],need:["데이터로 증명된 안전","가족 보호 확신","침수 탈출"],interest:["가족 안전","육아","전기차 안전"]} },
  { id:"range",icon:"🛣️",label:"802km 주행거리",tag:"CLTC 기준",sub:"서울↔부산 히터 풀가동",c:"#06b6d4",specs:["103kWh NMC","BMS 열관리","WLTP 615km"],tier:1,opp:93,search:"겨울 전기차 주행거리 월 28,500건",insight:"한국 겨울 5개월간 주행거리 불안은 전기차 전환 최대 저해요인. 802km는 심리적 안심 효과",
    ctx:{who:["장거리 통근자","귀성길 운전자","제주 여행 계획자","겨울철 전기차 오너"],when:["겨울 한파 시즌","명절 귀성","여름 휴가 로드트립"],where:["서울↔부산 고속도로","제주도 일주","강원도 스키장"],pain:["겨울 주행거리 급감","중간 충전 필수","히터 켜면 배터리 걱정"],need:["충전 없이 목적지 도착","겨울에도 안심 주행","히터 풀가동 자유"],interest:["전기차 주행거리","겨울 전기차","장거리 드라이브"]} },
  { id:"fridge",icon:"🧊",label:"차량 냉장고",tag:"-15°C~50°C",sub:"테슬라에 없는 진짜 냉장고",c:"#f472b6",specs:["듀얼온도 8L","냉동/보온"],tier:1,opp:91,search:"차량용 냉장고 월 15,800건",insight:"테슬라에 없는 유일한 기능. SNS 바이럴성 최고. '아이스크림 안 녹는 차' 후킹 파워 극강",
    ctx:{who:["캠핑 가족","장거리 운전자","아이 간식 부모","음료 마니아"],when:["여름 폭염","캠핑장 도착 전","장거리 중"],where:["캠핑장","고속도로","아이 등하원"],pain:["아이스크림 녹음","음료 미지근","보냉백 한계"],need:["진짜 냉동","음료 신선보관","테슬라에 없는 차별점"],interest:["캠핑 장비","차량 악세서리","가성비"]} },
  { id:"cinema",icon:"🎬",label:"무빙 시네마",tag:"3.5K+돌비",sub:"집보다 좋은 극장이 차 안에",c:"#f59e0b",specs:["21스피커 2,160W","돌비 아트모스","퀄컴 8295"],tier:2,opp:86,search:"차량 엔터테인먼트 월 9,200건",insight:"차박+캠핑 트렌드와 결합 시 강력. 감성 콘텐츠 제작에 최적화된 USP",
    ctx:{who:["홈시어터 마니아","가족 캠핑족","차박 영화 감상자","넷플릭스 헤비유저"],when:["주말 드라이브 후 휴식","캠핑장 저녁","아이 차 안 대기"],where:["캠핑장 주차","아파트 지하주차장","드라이브인"],pain:["차 스피커 음질 불만","태블릿 작은 화면","캠핑장 볼거리 부족"],need:["차 안 극장급 경험","가족 엔터테인먼트","고화질+사운드"],interest:["홈시어터","넷플릭스","캠핑 장비"]} },
  { id:"kids",icon:"👶",label:"뒷좌석 모니터링",tag:"OMS",sub:"고개 안 돌리고 아이 확인",c:"#fb923c",specs:["실시간 OMS","13\" OLED"],tier:2,opp:85,search:"차량 아이 안전 월 7,600건",insight:"육아맘/대디 타겟 공감형 콘텐츠. 경쟁사에 없는 기능으로 차별화 강력",
    ctx:{who:["영유아 자녀 부모","혼자 아이 태우는 운전자","맞벌이 등하원 담당"],when:["아이 등하원","장거리 가족여행","아이 차에서 잠들 때"],where:["스쿨존 주변","고속도로 장거리","아파트 단지"],pain:["운전 중 뒤돌아보는 위험","아이 상태 확인 불가","칭얼거리면 불안"],need:["시선 고정 안전 확인","실시간 모니터링","뒷좌석 엔터테인먼트"],interest:["육아","가족안전","차량 키즈용품"]} },
  { id:"space",icon:"🏕️",label:"호텔급 차박",tag:"Flat Floor",sub:"180cm 누워도 OK",c:"#14b8a6",specs:["2,925mm","32개 수납","V2L"],tier:2,opp:84,search:"차박 캠핑 월 22,400건",insight:"한국 캠핑 인구 700만. 차박 트렌드와 V2L 결합 시 강력한 라이프스타일 콘텐츠",
    ctx:{who:["차박 캠핑족","캠핑 입문자","가족 캠핑 계획자","미니멀 여행자"],when:["주말 차박","여름 캠핑","가을 단풍"],where:["해변 차박","산 캠핑장","휴게소 가수면"],pain:["SUV 눕기 불편","장비 적재 부족","차박 매트 불평탄"],need:["텐트 없이 호텔급","가족 4인 적재","V2L 전력"],interest:["차박","캠핑","아웃도어"]} },
  { id:"power",icon:"🏎️",label:"784마력 2.98초",tag:"AWD Ultra",sub:"SUV인데 슈퍼카 가속",c:"#ef4444",specs:["듀얼모터","제로백 2.98s","SEA 플랫폼"],tier:2,opp:82,search:"전기차 성능 비교 월 6,800건",insight:"바이럴 잠재력 높음. '가속 리액션' 콘텐츠는 알고리즘 추천률 상위",
    ctx:{who:["퍼포먼스카 매니아","스포츠카 원하는 SUV 오너","드라이빙 쾌감 추구자"],when:["신호 출발 순간","고속도로 합류","추월 상황"],where:["서킷 체험","고속도로 합류로","도심 신호 대기"],pain:["SUV는 느리다는 편견","가속 답답함","스포츠카는 비현실적"],need:["일상+퍼포먼스 양립","압도적 가속","SUV 실용성+스포츠카 성능"],interest:["자동차 성능","슈퍼카","드라이빙"]} },
  { id:"star",icon:"✨",label:"스타게이트 LED",tag:"1,831개",sub:"차 앞에서 춤추지 마세요",c:"#a78bfa",specs:["커스텀 그래픽","인터랙티브"],tier:3,opp:79,search:"차량 LED 커스텀 월 3,200건",insight:"SNS 바이럴 + 야간 촬영 콘텐츠. 인지도 확산용 엔터테인먼트 소재",
    ctx:{who:["디자인 감각파","SNS 크리에이터","차량 커스텀 매니아"],when:["야간 주차","친구 만날 때","SNS 촬영"],where:["야간 주차장","카페 앞","캠핑장 야간"],pain:["차가 다 비슷","개성 표현 어려움","야간 존재감 부족"],need:["나만의 커스텀","SNS 인증샷","야간 임팩트"],interest:["차량 디자인","LED 커스텀","SNS"]} },
  { id:"silence",icon:"🤫",label:"119개 차음설계",tag:"도서관보다 조용",sub:"시동 켜도 모르는 정숙성",c:"#8b5cf6",specs:["119포인트 NVH","에어서스펜션","이중접합유리"],tier:3,opp:78,search:"전기차 소음 월 4,100건",insight:"ASMR 콘텐츠 포맷과 궁합. 고급차 경험자 대상 프리미엄 어필",
    ctx:{who:["소음 민감 운전자","프리미엄 세단 경험자","장거리 피로 누적자","ASMR 소비자"],when:["고속 주행 중","새벽 출근길","장거리 야간 운전"],where:["고속도로 100km/h 이상","주택가 새벽 귀가","방음 비교 테스트"],pain:["고속 풍절음","전기차 로드노이즈","대화 톤 높아지는 차"],need:["고속에서도 속삭임 가능","프리미엄 정숙성","피로 경감"],interest:["ASMR","프리미엄 차량","승차감 리뷰"]} },
  { id:"hud",icon:"🌐",label:"36\" AR HUD",tag:"SF→현실",sub:"내비가 도로 위에 뜬다",c:"#10b981",specs:["36\" AR","EVA AI","OTA"],tier:3,opp:76,search:"AR HUD 월 2,800건",insight:"테크 매니아 타겟. 시각적 임팩트가 강해 숏폼 썸네일 클릭률 높음",
    ctx:{who:["테크 얼리어답터","SF영화 팬","시선 이동 싫은 운전자"],when:["처음 가는 길","야간 운전","복잡한 분기점"],where:["도심 복잡한 교차로","고속도로 분기점"],pain:["내비 보려고 시선 이동","HUD 정보 부족","야간 가독성"],need:["시선 고정 안전","SF 경험","직관적 길안내"],interest:["테크 가젯","자율주행","SF/미래기술"]} },
  { id:"adas",icon:"🤖",label:"G-Pilot ADAS",tag:"31센서",sub:"고속도로 핸즈프리",c:"#6366f1",specs:["엔비디아 Thor-U","핸즈프리"],tier:3,opp:74,search:"자율주행 보조 월 5,400건",insight:"테슬라 FSD 비교 콘텐츠와 연계. 다만 한국 법규 제한으로 실증 콘텐츠 제약",
    ctx:{who:["고속도로 장거리 출퇴근자","자율주행 관심자","운전 피로 호소자"],when:["출퇴근 정체","장거리 순항","주차 시"],where:["고속도로","도심 정체","좁은 주차장"],pain:["정체구간 피로","주차 스트레스","자율주행 신뢰 부족"],need:["핸즈프리 편안함","자동 주차","센서 신뢰도"],interest:["자율주행","테슬라 FSD 비교","AI 기술"]} },
];

const JOURNEY = [{id:"early",label:"Early Exploration",q:"이거 나한테 필요한가?",kw:"전기차 화재, LFP, 안전"},{id:"mid",label:"Mid-Stage",q:"뭐랑 비교해야 하지?",kw:"모델Y vs 7X, GV70, 가성비"},{id:"late",label:"Late-Stage",q:"사고 후회 안 할까?",kw:"ZEEKR AS, 중고차, 유지비"}];
const CREATORS = [{id:"brand",label:"브랜드",sub:"Foundational"},{id:"inf",label:"인플루언서",sub:"Credibility"},{id:"ugc",label:"UGC",sub:"Community"}];
const AXIS_COLORS = {who:"#3b82f6",when:"#f59e0b",where:"#06b6d4",pain:"#ef4444",need:"#10b981",interest:"#a78bfa"};
const AXIS_LABELS = {who:"WHO",when:"WHEN",where:"WHERE",pain:"PAIN",need:"NEED",interest:"INTEREST"};
const AXIS_Q = {who:"누가 우리의 타겟인가?",when:"언제 이 제품이 필요한가?",where:"어디서 이 제품을 쓰는가?",pain:"어떤 불편을 해결하는가?",need:"어떤 욕구를 충족하는가?",interest:"어떤 관심사와 연결되는가?"};

async function callAI(sys, usr) {
  try {
    const r = await fetch("/api/ai", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({system:sys,prompt:usr}) });
    const d = await r.json(); const txt = d.content?.[0]?.text || "";
    try { return JSON.parse(txt.replace(/```json\n?|```/g,"").trim()); } catch { return txt; }
  } catch(e) { return "API 오류: "+e.message; }
}

/* ═══ UI PRIMITIVES ═══ */
const G = {background:"rgba(255,255,255,0.025)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:14};
const Tag = ({c="#3b82f6",children}) => <span style={{display:"inline-block",padding:"4px 11px",borderRadius:20,fontSize:11,fontWeight:600,background:c+"18",color:c,border:`1px solid ${c}28`,whiteSpace:"nowrap"}}>{children}</span>;
const ScoreBadge = ({n}) => <div style={{width:48,height:48,borderRadius:12,background:(n>=90?"#10b981":n>=80?"#3b82f6":"#f59e0b")+"15",border:`2px solid ${n>=90?"#10b981":n>=80?"#3b82f6":"#f59e0b"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,fontWeight:900,color:n>=90?"#10b981":n>=80?"#3b82f6":"#f59e0b",flexShrink:0}}>{n}</div>;
const Btn = ({onClick,disabled,children,c="135deg,#3b82f6,#2563eb"}) => <button onClick={onClick} disabled={disabled} style={{padding:"14px 40px",borderRadius:12,border:"none",background:disabled?"#1e293b":`linear-gradient(${c})`,color:disabled?"#475569":"#fff",fontSize:14,fontWeight:700,cursor:disabled?"not-allowed":"pointer",fontFamily:FONT,boxShadow:disabled?"none":"0 6px 24px rgba(59,130,246,0.18)",transition:"all 0.3s"}}>{children}</button>;

/* ── Phone Mockup (Enhanced style) ── */
const PhoneMock = ({hook, typeName, color="#10b981"}) => {
  const h=Math.floor(Math.random()*600+300), cm=Math.floor(Math.random()*80+15), sh=Math.floor(Math.random()*50+10);
  const typeIcon = typeName?.includes("페인")?"🔥":typeName?.includes("증명")?"🔬":typeName?.includes("상황")?"📍":"⚡";
  return (
  <div style={{width:200,flexShrink:0,padding:"10px 6px 10px 12px"}}>
    <div style={{borderRadius:32,overflow:"hidden",border:"3px solid rgba(255,255,255,0.10)",background:"linear-gradient(170deg,#0f1923 0%,#0a1118 30%,#111a24 60%,#0d1520 100%)",position:"relative",boxShadow:"0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)"}}>
      {/* Status bar */}
      <div style={{padding:"10px 16px 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:9,color:"rgba(255,255,255,0.35)",fontWeight:600}}>9:41</span>
        <div style={{width:60,height:18,borderRadius:10,background:"#000",border:"1px solid rgba(255,255,255,0.08)"}} />
        <div style={{display:"flex",gap:3,alignItems:"center"}}>
          <div style={{width:13,height:8,borderRadius:2,border:"1px solid rgba(255,255,255,0.25)",position:"relative"}}><div style={{position:"absolute",left:1,top:1,bottom:1,right:3,borderRadius:1,background:"rgba(255,255,255,0.3)"}} /></div>
        </div>
      </div>
      {/* Content area */}
      <div style={{padding:"14px 16px 12px",display:"flex",gap:6}}>
        {/* Left: Badge + Text */}
        <div style={{flex:1,minWidth:0}}>
          {typeName && <div style={{display:"inline-flex",alignItems:"center",gap:4,padding:"5px 10px",borderRadius:8,fontSize:10,fontWeight:800,background:color+"25",color:color,marginBottom:14,border:`1px solid ${color}35`}}><span style={{fontSize:11}}>{typeIcon}</span>{typeName.split(". ").pop()}</div>}
          <div style={{fontSize:18,fontWeight:900,color:"#f1f5f9",lineHeight:1.35,letterSpacing:-0.5,minHeight:100}}>"{hook}"</div>
        </div>
        {/* Right: Social metrics (vertical, like real social) */}
        <div style={{display:"flex",flexDirection:"column",gap:16,alignItems:"center",paddingTop:50}}>
          {[["♡",h,"rgba(255,255,255,0.55)"],["●",cm,"rgba(255,255,255,0.45)"],["▶",sh,"rgba(255,255,255,0.40)"]].map(([ic,n,clr],i) => (
            <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
              <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:clr}}>{ic}</div>
              <span style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.45)"}}>{n}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom bar */}
      <div style={{padding:"4px 0 10px",display:"flex",justifyContent:"center"}}>
        <div style={{width:56,height:4,borderRadius:2,background:"rgba(255,255,255,0.15)"}} />
      </div>
    </div>
  </div>
  );
};

/* ═══ MAIN ═══ */
export default function App() {
  const [view, setView] = useState("home");
  const [step, setStep] = useState(0);
  const [selUsp, setSelUsp] = useState(null);
  const [contexts, setContexts] = useState(null);
  const [pickedIdx, setPickedIdx] = useState(null);
  const [sfResult, setSfResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selJ, setSelJ] = useState(null);
  const [selCr, setSelCr] = useState(null);
  const [jResults, setJResults] = useState(null);
  
  const [crResult, setCrResult] = useState(null); // creator AI result

  useEffect(() => setMounted(true), []);
  const goHome = () => { setView("home"); setStep(0); setSelUsp(null); setContexts(null); setPickedIdx(null); setSfResult(null); setJResults(null); setCrResult(null); };
  const goEngine = () => { setView("engine"); setStep(0); setSelUsp(null); setContexts(null); setPickedIdx(null); setSfResult(null); };
  const goJourney = () => { setView("journey"); setJResults(null); setSelJ(null); setSelCr(null); };
  const goCreator = () => { setView("creator"); setCrResult(null); };
  const selectUsp = (u) => { setSelUsp(u); setStep(1); setContexts(null); setPickedIdx(null); setSfResult(null); };

  const runContextMatch = useCallback(async () => {
    if (!selUsp) return;
    setLoading(true); setContexts(null); setPickedIdx(null); setStep(2);
    const u = selUsp;
    const r = await callAI(
      "ZEEKR 7X 알고리즘 콘텐츠 전문가. 반드시 순수 JSON만 반환. markdown 코드블록 없이. 한국어.",
      `ZEEKR 7X USP "${u.label}"(${u.sub}, 스펙: ${u.specs.join(", ")})
맥락: WHO:${u.ctx.who.join(",")} WHEN:${u.ctx.when.join(",")} WHERE:${u.ctx.where.join(",")} PAIN:${u.ctx.pain.join(",")} NEED:${u.ctx.need.join(",")} INTEREST:${u.ctx.interest.join(",")}

이 USP "${u.label}"로 만들 숏폼 TOP 5 JSON:
[{"score":93,"title":"숏폼 컨셉 한줄","desc":"1줄 설명","type":"pain|proof|context","typeName":"A. 페인포인트 자극형|B. 기능 증명형|C. 상황 제안형","who":"타겟","pain":"페인포인트","searchData":"검색 키워드 월 N건, 성별, 데이터 1줄","hook":"후킹카피 20자이내","scenes":["씬1","씬2","씬3","씬4"]}]
score 82~97. 이 USP "${u.label}"에만 관련된 내용으로. 5개.`
    );
    setContexts(Array.isArray(r) ? r : null); setLoading(false);
  }, [selUsp]);

  const generateSF = useCallback(async () => {
    if (pickedIdx === null || !contexts) return;
    const ctx = contexts[pickedIdx];
    setStep(3); setLoading(true); setSfResult(null);
    const r = await callAI(
      "ZEEKR 7X 숏폼 프로듀서. 순수 JSON만. 한국어.",
      `USP "${selUsp.label}"(${selUsp.sub}). 맥락: ${ctx.title}, WHO:${ctx.who}, PAIN:${ctx.pain}, 후킹:"${ctx.hook}"
Shorts+Reels JSON:
{"type":"${ctx.type}","typeName":"${ctx.typeName}","who":"${ctx.who}","pain":"${ctx.pain}",
"shorts":{"title":"컨셉","hook":"후킹","hookDesc":"전략1줄","scenes":["씬1","씬2","씬3","씬4"],"proof":"증명","cta":"CTA","tags":["#1","#2","#3","#4","#5"],"uploadTime":"최적시간","targetCluster":"클러스터"},
"reels":{"title":"컨셉","hook":"후킹","hookDesc":"전략1줄","scenes":["씬1","씬2","씬3","씬4"],"proof":"증명","cta":"CTA","tags":["#1","#2","#3","#4"],"uploadTime":"최적시간","targetCluster":"클러스터"}}`
    );
    setSfResult(typeof r === "object" && r.shorts ? r : null); setLoading(false);
  }, [selUsp, contexts, pickedIdx]);

  const runJourney = useCallback(async (j, c) => {
    setLoading(true); setJResults(null);
    const r = await callAI("ZEEKR 7X 탐색여정 전문가. 순수 JSON만. 한국어.",
      `"${j.label}"(질문:"${j.q}",키워드:${j.kw}) × "${c.label}" 3개 JSON:
[{"title":"컨셉","keyword":"키워드","hook":"후킹","overview":"개요3줄","why":"왜효과적2줄","proofPoints":["USP1","USP2"],"score":90}]`);
    setJResults(Array.isArray(r) ? r : null); setLoading(false);
  }, []);

  return (
    <div style={{fontFamily:FONT,background:"#06080e",color:"#e2e8f0",minHeight:"100vh"}}>
      {/* NAV */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,8,14,0.92)",backdropFilter:"blur(24px)",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
        <div style={{maxWidth:MAX_W,margin:"0 auto",padding:`14px ${PX}px`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,cursor:"pointer"}} onClick={goHome}>
            <div style={{width:36,height:36,borderRadius:8,background:"linear-gradient(135deg,#3b82f6,#06b6d4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900,color:"#fff"}}>7X</div>
            <div><div style={{fontSize:15,fontWeight:800,letterSpacing:-0.3}}>ZEEKR 7X Content Engine</div><div style={{fontSize:9,color:"#475569",letterSpacing:2.5,textTransform:"uppercase"}}>Algorithm Performance Platform</div></div>
          </div>
          {view!=="home"&&<div style={{display:"flex",gap:4}}>
            <button onClick={goEngine} style={{padding:"8px 18px",borderRadius:8,border:"none",background:view==="engine"?"rgba(59,130,246,0.15)":"transparent",color:view==="engine"?"#60a5fa":"#64748b",fontSize:12,fontWeight:view==="engine"?700:500,cursor:"pointer",fontFamily:FONT}}>⚡ 알고리즘 콘텐츠 엔진</button>
            <button onClick={goCreator} style={{padding:"8px 18px",borderRadius:8,border:"none",background:view==="creator"?"rgba(245,158,11,0.15)":"transparent",color:view==="creator"?"#fbbf24":"#64748b",fontSize:12,fontWeight:view==="creator"?700:500,cursor:"pointer",fontFamily:FONT}}>🤝 크리에이터 매칭</button>
            <button onClick={goJourney} style={{padding:"8px 18px",borderRadius:8,border:"none",background:view==="journey"?"rgba(16,185,129,0.15)":"transparent",color:view==="journey"?"#34d399":"#64748b",fontSize:12,fontWeight:view==="journey"?700:500,cursor:"pointer",fontFamily:FONT}}>🗺️ 탐색 여정 콘텐츠 맵</button>
          </div>}
          <div style={{fontSize:10,color:"#334155",minWidth:80,textAlign:"right"}}>Pentacle × AI</div>
        </div>
      </nav>

      {/* HOME */}
      {view==="home"&&<div style={{maxWidth:MAX_W,margin:"0 auto",padding:`0 ${PX}px`}}>
        <div style={{paddingTop:80,paddingBottom:60,position:"relative"}}>
          <div style={{position:"absolute",top:-60,right:-80,width:420,height:420,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,130,246,0.07),transparent 70%)",pointerEvents:"none"}} />
          <div style={{maxWidth:680,position:"relative"}}>
            <div style={{fontSize:11,fontWeight:700,color:"#3b82f6",letterSpacing:3,textTransform:"uppercase",marginBottom:20,opacity:mounted?1:0,transition:"all 0.6s ease 0.1s"}}>Algorithm Content Engine</div>
            <h1 style={{fontSize:44,fontWeight:900,lineHeight:1.18,letterSpacing:-1.5,opacity:mounted?1:0,transition:"all 0.8s ease 0.2s"}}><span>ZEEKR 7X의 USP를</span><br/><span style={{background:"linear-gradient(135deg,#3b82f6,#06b6d4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>알고리즘이 사랑하는 콘텐츠</span><span>로</span></h1>
            <p style={{fontSize:15,color:"#64748b",lineHeight:1.75,marginTop:20,maxWidth:560,opacity:mounted?1:0,transition:"all 0.6s ease 0.4s"}}>12개 Vehicle USP에서 AI가 관심사 + 맥락을 분석하여 숏폼을 생성하고,<br/>소비자 탐색 여정 단계별 <strong style={{color:"#94a3b8"}}>검색 → 비교 → 구매 확신</strong>까지의<br/>콘텐츠 전략을 자동으로 설계합니다.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",marginTop:48,maxWidth:480,opacity:mounted?1:0,transition:"all 0.6s ease 0.5s"}}>
            {[["12","USPs"],["6","Context Axes"],["3×3","Journey Map"],["∞","Contents"]].map(([n,l],i)=><div key={i} style={{textAlign:"center"}}><div style={{fontSize:28,fontWeight:900}}>{n}</div><div style={{fontSize:10,fontWeight:700,color:"#3b82f6",letterSpacing:1.5,marginTop:6}}>{l}</div></div>)}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20,paddingBottom:80}}>
          {[{fn:goEngine,ic:"⚡",t:"알고리즘 콘텐츠 엔진",d:"USP별 6축 맥락 분석 → TOP 5 맥락 추천 → Shorts + Reels 원스톱 생성",tags:["6축 맥락매칭","스코어링","Shorts + Reels"],a:"#3b82f6"},
            {fn:goCreator,ic:"🤝",t:"크리에이터 매칭",d:"USP를 자동차 밖의 크리에이터와 연결. 캠핑·육아·테크·셀럽 채널과의 협업 아이디어를 설계",tags:["USP×크리에이터","비자동차 채널","협업 콘텐츠"],a:"#f59e0b"},
            {fn:goJourney,ic:"🗺️",t:"탐색 여정 콘텐츠 맵",d:"검색→비교→구매확신 여정별 브랜드·인플루언서·UGC 콘텐츠 자동 설계",tags:["구매여정 3단계","크리에이터 3타입"],a:"#10b981"}
          ].map((f,i)=><div key={i} onClick={f.fn} style={{...G,padding:32,cursor:"pointer",transition:"all 0.35s",display:"flex",flexDirection:"column",opacity:mounted?1:0,transitionDelay:`${0.55+i*0.1}s`}} onMouseEnter={e=>{e.currentTarget.style.borderColor=f.a+"30";e.currentTarget.style.transform="translateY(-3px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.05)";e.currentTarget.style.transform="none";}}>
            <div style={{fontSize:32,marginBottom:16}}>{f.ic}</div><div style={{fontSize:18,fontWeight:900,marginBottom:10}}>{f.t}</div><div style={{fontSize:13,color:"#64748b",lineHeight:1.75,flex:1}}>{f.d}</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",margin:"16px 0"}}>{f.tags.map(t=><Tag key={t} c={f.a}>{t}</Tag>)}</div><div style={{fontSize:13,fontWeight:700,color:f.a}}>시작하기 →</div>
          </div>)}
        </div>
      </div>}

      {/* ENGINE */}
      {view==="engine"&&<div style={{maxWidth:MAX_W,margin:"0 auto",padding:`40px ${PX}px 80px`}}>
        {/* Progress */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:40,padding:"16px 0"}}>
          {[{n:1,l:"USP 선택"},{n:2,l:"맥락 분석"},{n:3,l:"숏폼 제작"}].map((s,i)=>
            <div key={i} style={{display:"flex",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:30,height:30,borderRadius:"50%",background:step>=i+1?"linear-gradient(135deg,#3b82f6,#06b6d4)":"rgba(255,255,255,0.04)",border:step>=i+1?"none":"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:step>=i+1?"#fff":"#475569"}}>{s.n}</div>
                <span style={{fontSize:13,fontWeight:step===i+1?800:500,color:step>=i+1?"#f1f5f9":"#475569"}}>{s.l}</span>
              </div>
              {i<2&&<div style={{width:80,height:1,background:step>i+1?"#3b82f6":"rgba(255,255,255,0.06)",margin:"0 20px"}} />}
            </div>
          )}
        </div>

        {/* STEP 0 */}
        {step===0&&<>
          <h2 style={{fontSize:22,fontWeight:900,marginBottom:6}}>USP 선택</h2>
          <p style={{fontSize:13,color:"#64748b",marginBottom:32}}>한국 시장 데이터 기반으로 콘텐츠 기회가 높은 USP 순으로 정렬되어 있습니다</p>

          {/* Tier 1: 핵심 USP */}
          <div style={{marginBottom:28}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <span style={{fontSize:11,fontWeight:800,color:"#10b981",letterSpacing:2,textTransform:"uppercase"}}>핵심 USP</span>
              <span style={{fontSize:10,color:"#475569"}}>— 한국 시장 최고 기회</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              {USPS.filter(u=>u.tier===1).map(u=>(
                <div key={u.id} onClick={()=>selectUsp(u)} style={{...G,padding:0,cursor:"pointer",transition:"all 0.3s",overflow:"hidden",display:"flex"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=u.c+"40";e.currentTarget.style.transform="translateY(-2px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.05)";e.currentTarget.style.transform="none";}}>
                  {/* Left: Icon + Score */}
                  <div style={{width:90,background:u.c+"08",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,borderRight:"1px solid rgba(255,255,255,0.04)",padding:"20px 0"}}>
                    <div style={{fontSize:36}}>{u.icon}</div>
                    <div style={{width:38,height:38,borderRadius:10,background:u.c+"20",border:`2px solid ${u.c}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:900,color:u.c}}>{u.opp}</div>
                  </div>
                  {/* Right: Info */}
                  <div style={{flex:1,padding:"16px 20px"}}>
                    <div style={{fontSize:15,fontWeight:800,marginBottom:3}}>{u.label}</div>
                    <div style={{fontSize:11,color:"#64748b",marginBottom:10}}>{u.sub}</div>
                    <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>{u.specs.map((s,i)=><Tag key={i} c={u.c}>{s}</Tag>)}</div>
                    <div style={{fontSize:10,color:"#475569",display:"flex",alignItems:"center",gap:4}}><span style={{color:"#10b981"}}>📊</span>{u.search}</div>
                    <div style={{fontSize:11,color:"#94a3b8",marginTop:6,lineHeight:1.5}}>{u.insight}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 2: 주요 USP */}
          <div style={{marginBottom:28}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <span style={{fontSize:11,fontWeight:800,color:"#3b82f6",letterSpacing:2,textTransform:"uppercase"}}>주요 USP</span>
              <span style={{fontSize:10,color:"#475569"}}>— 라이프스타일 연결 강점</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
              {USPS.filter(u=>u.tier===2).map(u=>(
                <div key={u.id} onClick={()=>selectUsp(u)} style={{...G,padding:16,cursor:"pointer",transition:"all 0.3s"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=u.c+"35";e.currentTarget.style.transform="translateY(-2px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.05)";e.currentTarget.style.transform="none";}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                    <span style={{fontSize:28}}>{u.icon}</span>
                    <span style={{fontSize:12,fontWeight:800,color:u.c}}>{u.opp}</span>
                  </div>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:3}}>{u.label}</div>
                  <div style={{fontSize:10,color:"#475569",marginBottom:8}}>{u.tag}</div>
                  <div style={{fontSize:10,color:"#475569",display:"flex",alignItems:"center",gap:3}}><span style={{color:"#10b981",fontSize:8}}>●</span>{u.search.split("월")[0]}월{u.search.split("월")[1]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 3: 추가 USP */}
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <span style={{fontSize:11,fontWeight:800,color:"#64748b",letterSpacing:2,textTransform:"uppercase"}}>추가 USP</span>
              <span style={{fontSize:10,color:"#475569"}}>— 니치 타겟 & 바이럴 소재</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
              {USPS.filter(u=>u.tier===3).map(u=>(
                <div key={u.id} onClick={()=>selectUsp(u)} style={{...G,padding:"14px 16px",cursor:"pointer",transition:"all 0.3s",display:"flex",alignItems:"center",gap:12}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.12)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.05)";}}>
                  <span style={{fontSize:22}}>{u.icon}</span>
                  <div>
                    <div style={{fontSize:12,fontWeight:700}}>{u.label}</div>
                    <div style={{fontSize:10,color:"#475569"}}>{u.tag}</div>
                  </div>
                  <span style={{marginLeft:"auto",fontSize:11,fontWeight:700,color:"#475569"}}>{u.opp}</span>
                </div>
              ))}
            </div>
          </div>
        </>}

        {/* STEP 1+ */}
        {step>=1&&selUsp&&<>
          {/* USP Bar */}
          <div style={{...G,padding:"16px 24px",marginBottom:24,display:"flex",alignItems:"center",gap:16}}>
            <div style={{fontSize:30}}>{selUsp.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:16,fontWeight:800}}>{selUsp.label} <span style={{fontSize:12,fontWeight:500,color:"#64748b"}}>{selUsp.sub}</span></div>
              <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>{selUsp.specs.map((s,i)=><Tag key={i} c={selUsp.c}>{s}</Tag>)}</div>
            </div>
            {!loading&&step<3&&<button onClick={runContextMatch} style={{padding:"12px 28px",borderRadius:10,background:"linear-gradient(135deg,#06b6d4,#0891b2)",border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:FONT,boxShadow:"0 4px 16px rgba(6,182,212,0.2)",whiteSpace:"nowrap"}}>◎ AI 맥락 매칭 실행</button>}
            <button onClick={()=>{setStep(0);setSelUsp(null);setContexts(null);setPickedIdx(null);}} style={{padding:"8px 16px",borderRadius:8,border:"1px solid rgba(255,255,255,0.08)",background:"transparent",color:"#64748b",fontSize:12,cursor:"pointer",fontFamily:FONT}}>← 다른 USP</button>
          </div>

          {/* 6-Axis */}
          {step<3&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:28}}>
            {Object.entries(selUsp.ctx).map(([key, tags])=>
              <div key={key} style={{...G,padding:16}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                  <span style={{width:7,height:7,borderRadius:"50%",background:AXIS_COLORS[key]}} />
                  <span style={{fontSize:14,fontWeight:900,color:AXIS_COLORS[key]}}>{AXIS_LABELS[key]}</span>
                  <span style={{fontSize:10,color:"#475569"}}>{AXIS_Q[key]}</span>
                </div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{tags.map((t,i)=><Tag key={i} c={AXIS_COLORS[key]}>{t}</Tag>)}</div>
              </div>
            )}
          </div>}

          {/* Context Results */}
          {step===2&&contexts&&<>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
              <span style={{fontSize:17,fontWeight:900}}>• AI 추천 맥락 조합 TOP {contexts.length}</span>
              <Tag c="#06b6d4">AI 실시간 생성</Tag>
              <button onClick={runContextMatch} style={{marginLeft:"auto",padding:"7px 18px",borderRadius:8,border:"1px solid rgba(255,255,255,0.08)",background:"transparent",color:"#64748b",fontSize:12,cursor:"pointer",fontFamily:FONT}}>↻ 재생성</button>
            </div>

            {contexts.map((ctx,i)=>{
              const picked = pickedIdx===i;
              return (
                <div key={i} onClick={()=>setPickedIdx(i)}
                  style={{...G,padding:0,marginBottom:16,display:"flex",overflow:"hidden",cursor:"pointer",transition:"all 0.25s",
                    borderColor:picked?"rgba(6,182,212,0.5)":"rgba(255,255,255,0.05)",
                    boxShadow:picked?"0 0 0 1px rgba(6,182,212,0.3), 0 4px 20px rgba(6,182,212,0.08)":"none"
                  }}>
                  {/* Phone Mockup */}
                  <PhoneMock hook={ctx.hook} typeName={ctx.typeName} color={ctx.type==="pain"?"#ef4444":ctx.type==="proof"?"#10b981":"#8b5cf6"} />

                  {/* Content */}
                  <div style={{flex:1,padding:"20px 28px 20px 16px"}}>
                    {/* Title + Score */}
                    <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:10}}>
                      <div style={{width:28,height:28,borderRadius:"50%",background:picked?"linear-gradient(135deg,#06b6d4,#0891b2)":"rgba(59,130,246,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:picked?"#fff":"#3b82f6",flexShrink:0}}>{i+1}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:15,fontWeight:800,lineHeight:1.4}}>{ctx.title}</div>
                        <div style={{fontSize:12,color:"#64748b",marginTop:3}}>{ctx.desc}</div>
                      </div>
                      <ScoreBadge n={ctx.score} />
                    </div>

                    {/* Tags */}
                    <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8}}>
                      <Tag c="#3b82f6">WHO: {ctx.who}</Tag>
                      <Tag c="#ef4444">PAIN: {ctx.pain}</Tag>
                    </div>

                    {/* Search Data */}
                    {ctx.searchData&&<div style={{fontSize:11,color:"#475569",marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
                      <span style={{color:"#10b981"}}>📊</span> {ctx.searchData}
                    </div>}

                    {/* HOOK */}
                    <div style={{marginBottom:14}}>
                      <span style={{fontSize:11,fontWeight:800,color:"#f59e0b"}}>🎣 HOOK</span>
                      <div style={{fontSize:14,fontWeight:700,marginTop:4}}>"{ctx.hook}"</div>
                    </div>

                    {/* Horizontal Scenes */}
                    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
                      {(ctx.scenes||[]).map((s,j)=>
                        <div key={j} style={{padding:"8px 10px",borderRadius:8,border:"1px solid rgba(255,255,255,0.04)",background:"rgba(255,255,255,0.015)"}}>
                          <div style={{fontSize:9,fontWeight:800,color:"#60a5fa",marginBottom:4}}>씬{j+1}</div>
                          <div style={{fontSize:11,color:"#94a3b8",lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{s}</div>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div style={{display:"flex",gap:8,marginTop:14,alignItems:"center"}}>
                      <span style={{fontSize:11,color:"#10b981",fontWeight:700,display:"flex",alignItems:"center",gap:4}}>🎬 AI 영상 가능</span>
                      <button onClick={(e)=>{e.stopPropagation();setPickedIdx(i);}} style={{padding:"7px 18px",borderRadius:8,background:picked?"linear-gradient(135deg,#06b6d4,#0891b2)":"rgba(6,182,212,0.08)",border:picked?"none":"1px solid rgba(6,182,212,0.25)",color:picked?"#fff":"#06b6d4",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:FONT,transition:"all 0.2s"}}>촬영 스토리보드 생성 →</button>
                      <button onClick={(e)=>{e.stopPropagation();runContextMatch();}} style={{padding:"7px 14px",borderRadius:8,border:"1px solid rgba(255,255,255,0.08)",background:"transparent",color:"#64748b",fontSize:11,cursor:"pointer",fontFamily:FONT}}>↻ 재생성</button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Bottom CTA */}
            <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:28,padding:"20px 0",borderTop:"1px solid rgba(255,255,255,0.04)"}}>
              <button onClick={runContextMatch} style={{padding:"12px 26px",borderRadius:10,border:"1px solid rgba(255,255,255,0.08)",background:"transparent",color:"#94a3b8",fontSize:13,cursor:"pointer",fontFamily:FONT}}>↻ 재생성</button>
              <button onClick={generateSF} disabled={pickedIdx===null||loading}
                style={{padding:"14px 36px",borderRadius:12,border:"none",
                  background:pickedIdx===null?"#1e293b":"linear-gradient(135deg,#06b6d4,#0891b2)",
                  color:pickedIdx===null?"#475569":"#fff",fontSize:14,fontWeight:700,
                  cursor:pickedIdx===null?"not-allowed":"pointer",fontFamily:FONT,
                  boxShadow:pickedIdx===null?"none":"0 6px 24px rgba(6,182,212,0.2)"}}>
                {loading?"⏳ 생성 중...":pickedIdx===null?"맥락을 선택하세요":"🎬 선택한 맥락으로 숏폼 제작 →"}
              </button>
            </div>
          </>}

          {/* STEP 3: Shortform */}
          {step===3&&sfResult&&<>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:24,padding:"14px 18px",...G,borderColor:"rgba(6,182,212,0.12)"}}>
              <Tag c={sfResult.type==="pain"?"#ef4444":sfResult.type==="proof"?"#10b981":"#8b5cf6"}>{sfResult.typeName}</Tag>
              <Tag c="#3b82f6">WHO: {sfResult.who}</Tag>
              <Tag c="#ef4444">PAIN: {sfResult.pain}</Tag>
            </div>
            <h3 style={{fontSize:20,fontWeight:900,marginBottom:24}}>▸ 숏폼 제작</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
              {[{key:"shorts",platform:"YouTube Shorts",icon:"▶",max:"MAX 60s",c:"#ef4444"},{key:"reels",platform:"Instagram Reels",icon:"◉",max:"MAX 90s",c:"#a78bfa"}].map(p=>{
                const d=sfResult[p.key]; if(!d) return null;
                return (
                  <div key={p.key} style={{...G,padding:0,overflow:"hidden",display:"flex",flexDirection:"column"}}>
                    <div style={{padding:"14px 22px",borderBottom:"1px solid rgba(255,255,255,0.04)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{color:p.c,fontWeight:900}}>{p.icon}</span><span style={{fontSize:15,fontWeight:800}}>{p.platform}</span></div>
                      <div style={{display:"flex",gap:6}}><Tag c={p.c}>{p.max}</Tag><Tag c="#475569">9:16</Tag></div>
                    </div>
                    <div style={{padding:24,flex:1,display:"flex",flexDirection:"column"}}>
                      <div style={{fontSize:17,fontWeight:800,marginBottom:16}}>"{d.hook}"</div>
                      <div style={{...G,padding:14,marginBottom:16,borderColor:"rgba(245,158,11,0.1)"}}>
                        <div style={{fontSize:10,fontWeight:800,color:"#f59e0b",marginBottom:5}}>🎣 HOOK (0~3초)</div>
                        <div style={{fontSize:14,fontWeight:700}}>{d.hook}</div>
                        <div style={{fontSize:12,color:"#64748b",marginTop:4}}>{d.hookDesc}</div>
                      </div>
                      <div style={{marginBottom:16}}>
                        <div style={{fontSize:10,fontWeight:800,color:"#06b6d4",marginBottom:8}}>🎬 SCENE FLOW</div>
                        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
                          {(d.scenes||[]).map((s,j)=><div key={j} style={{padding:"8px 10px",borderRadius:8,border:"1px solid rgba(255,255,255,0.04)",background:"rgba(255,255,255,0.015)"}}><div style={{fontSize:9,fontWeight:800,color:"#60a5fa",marginBottom:4}}>씬{j+1}</div><div style={{fontSize:11,color:"#94a3b8",lineHeight:1.5}}>{s}</div></div>)}
                        </div>
                      </div>
                      <div style={{...G,padding:12,marginBottom:10,borderColor:"rgba(16,185,129,0.1)"}}><span style={{fontSize:10,fontWeight:800,color:"#10b981"}}>✓ PROOF</span><span style={{fontSize:12,color:"#94a3b8",marginLeft:8}}>{d.proof}</span></div>
                      <div style={{...G,padding:12,marginBottom:16,borderColor:"rgba(59,130,246,0.1)"}}><span style={{fontSize:10,fontWeight:800,color:"#3b82f6"}}>→ CTA</span><span style={{fontSize:12,color:"#94a3b8",marginLeft:8}}>{d.cta}</span></div>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>{(d.tags||[]).map((t,i)=><span key={i} style={{fontSize:10,color:"#64748b",background:"rgba(255,255,255,0.03)",padding:"4px 9px",borderRadius:6}}>{t}</span>)}</div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,fontSize:10,marginTop:"auto",paddingTop:12,borderTop:"1px solid rgba(255,255,255,0.04)"}}>
                        <div><span style={{color:"#475569"}}>업로드 최적시간</span><div style={{color:"#94a3b8",marginTop:3,fontSize:11}}>{d.uploadTime}</div></div>
                        <div><span style={{color:"#475569"}}>타겟 클러스터</span><div style={{color:"#3b82f6",marginTop:3,fontSize:11}}>{d.targetCluster}</div></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:32}}>
              <button onClick={()=>{setSfResult(null);generateSF();}} style={{padding:"12px 26px",borderRadius:10,border:"1px solid rgba(255,255,255,0.08)",background:"transparent",color:"#94a3b8",fontSize:13,cursor:"pointer",fontFamily:FONT}}>↻ 같은 맥락으로 재생성</button>
              <button onClick={()=>{setStep(2);setSfResult(null);setPickedIdx(null);}} style={{padding:"12px 26px",borderRadius:10,border:"1px solid rgba(255,255,255,0.08)",background:"transparent",color:"#94a3b8",fontSize:13,cursor:"pointer",fontFamily:FONT}}>◎ 다른 맥락 선택</button>
              <button style={{padding:"12px 30px",borderRadius:10,background:"linear-gradient(135deg,#a78bfa,#7c3aed)",border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:FONT}}>🎥 촬영 스토리보드 생성</button>
            </div>
          </>}
        </>}
      </div>}

      {/* JOURNEY */}
      {view==="journey"&&<div style={{maxWidth:MAX_W,margin:"0 auto",padding:`40px ${PX}px 80px`}}>
        <h2 style={{fontSize:22,fontWeight:900,marginBottom:6}}>🗺️ 소비자 탐색 여정 콘텐츠 맵</h2>
        <p style={{fontSize:13,color:"#64748b",marginBottom:32}}>구매 여정 단계 × 크리에이터 타입 → 교차점 콘텐츠 생성. 셀을 선택하면 해당 교차점에 최적화된 콘텐츠 아이디어를 AI가 생성합니다.</p>
        <div style={{display:"grid",gridTemplateColumns:"200px repeat(3,1fr)",gap:10,marginBottom:28}}>
          <div />{CREATORS.map(c=><div key={c.id} style={{...G,padding:16,textAlign:"center",background:"rgba(16,185,129,0.03)"}}><div style={{fontSize:14,fontWeight:800,color:"#34d399"}}>{c.label}</div><div style={{fontSize:10,color:"#475569",marginTop:4}}>{c.sub}</div></div>)}
          {JOURNEY.map(j=>[
            <div key={j.id} style={{...G,padding:16}}><div style={{fontSize:13,fontWeight:800}}>{j.label}</div><div style={{fontSize:11,color:"#34d399",marginTop:6}}>"{j.q}"</div><div style={{fontSize:9,color:"#475569",marginTop:4}}>{j.kw}</div></div>,
            ...CREATORS.map(c=>{const sl=selJ?.id===j.id&&selCr?.id===c.id;
              const JC={"early-brand":"[배터리 안전 실험]\nLFP 1000°C 화재 테스트\n— 안전은 국적이 아니라 과학","early-inf":"[전문가 해부]\n중국 전기차,\n정말 안전할까?","early-ugc":"[실구매 고백]\n중국차 편견이\n깨진 순간","mid-brand":"[스펙 대결]\n10분 충전 800V\nvs 테슬라 250kW","mid-inf":"[크로스 시승]\n모델Y 오너가\n7X를 직접 비교","mid-ugc":"[시승 브이로그]\n5천만원대에서\n이 옵션이 된다고?","late-brand":"[AS 공개]\n볼보 딜러 기반\n서비스 로드맵","late-inf":"[하체 분석]\n리프트에 올려서\n내구성 직접 확인","late-ugc":"[1개월 리얼 후기]\n주변 반응 변화와\n실제 유지비 공개"};
              const cellKey=j.id+"-"+c.id;
              const cellText=JC[cellKey]||"";
              return <div key={j.id+c.id} onClick={()=>{setSelJ(j);setSelCr(c);setJResults(null);}} style={{...G,padding:14,cursor:"pointer",borderColor:sl?"rgba(16,185,129,0.4)":undefined,background:sl?"rgba(16,185,129,0.08)":undefined,transition:"all 0.25s",position:"relative"}}
                onMouseEnter={e=>{if(!sl)e.currentTarget.style.borderColor="rgba(16,185,129,0.2)";}}
                onMouseLeave={e=>{if(!sl)e.currentTarget.style.borderColor="rgba(255,255,255,0.05)";}}>
                {sl&&<div style={{position:"absolute",top:8,right:8,width:18,height:18,borderRadius:"50%",background:"#10b981",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#fff"}}>✓</div>}
                <div style={{fontSize:12,fontWeight:700,color:sl?"#34d399":"#e2e8f0",lineHeight:1.5,whiteSpace:"pre-wrap"}}>{cellText}</div>
              </div>;})
          ])}
        </div>
        {selJ&&selCr&&!jResults&&<div style={{textAlign:"center",padding:20}}><Btn onClick={()=>runJourney(selJ,selCr)} disabled={loading} c="135deg,#10b981,#059669">{loading?"⏳":"🗺️ 콘텐츠 생성"}</Btn></div>}
        {jResults&&jResults.map((r,i)=><div key={i} style={{...G,padding:24,marginBottom:14,display:"flex",gap:18,alignItems:"flex-start"}}><ScoreBadge n={r.score}/><div style={{flex:1}}><div style={{fontSize:15,fontWeight:800,marginBottom:6}}>{r.title}</div><div style={{display:"flex",gap:6,marginBottom:10}}><Tag c="#06b6d4">{r.keyword}</Tag></div><div style={{fontSize:14,fontWeight:700,color:"#f59e0b",marginBottom:10}}>🎣 "{r.hook}"</div><div style={{fontSize:13,color:"#94a3b8",lineHeight:1.75,whiteSpace:"pre-wrap"}}>{r.overview}</div><div style={{fontSize:12,color:"#64748b",marginTop:10,fontStyle:"italic"}}>{r.why}</div><div style={{display:"flex",gap:6,marginTop:12}}>{(r.proofPoints||[]).map((p,j)=><Tag key={j} c="#10b981">{p}</Tag>)}</div></div></div>)}
      </div>}

      {/* ═══ CREATOR MATCHING ═══ */}
      {view==="creator"&&<div style={{maxWidth:MAX_W,margin:"0 auto",padding:`40px ${PX}px 80px`}}>
        <h2 style={{fontSize:22,fontWeight:900,marginBottom:6}}>🤝 크리에이터 매칭</h2>
        <p style={{fontSize:13,color:"#64748b",marginBottom:8}}>ZEEKR 7X의 12개 USP를 AI가 자동 분석하여 최적의 크리에이터를 매칭합니다. 차 유튜버뿐 아니라 캠핑·육아·테크·과학·셀럽까지 — 매번 새로운 조합을 추천합니다.</p>

        {/* Two approach cards */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:32}}>
          <div style={{...G,padding:20,borderColor:"rgba(59,130,246,0.12)"}}>
            <div style={{fontSize:11,fontWeight:800,color:"#3b82f6",letterSpacing:1.5,marginBottom:8}}>APPROACH 1</div>
            <div style={{fontSize:15,fontWeight:800,marginBottom:4}}>USP → 크리에이터 매칭</div>
            <div style={{fontSize:12,color:"#64748b",lineHeight:1.6}}>개별 USP 또는 USP 조합에서 출발하여, 그 기능을 가장 효과적으로 이야기해줄 수 있는 비자동차 카테고리 크리에이터를 추천</div>
          </div>
          <div style={{...G,padding:20,borderColor:"rgba(245,158,11,0.12)"}}>
            <div style={{fontSize:11,fontWeight:800,color:"#f59e0b",letterSpacing:1.5,marginBottom:8}}>APPROACH 2</div>
            <div style={{fontSize:15,fontWeight:800,marginBottom:4}}>셀럽 → 스토리 설계</div>
            <div style={{fontSize:12,color:"#64748b",lineHeight:1.6}}>타겟 오디언스가 겹치는 셀럽/메가 유튜버에서 출발하여, ZEEKR 7X를 자연스럽게 녹여낼 수 있는 스토리 앵글을 설계</div>
          </div>
        </div>

        {/* CTA Button */}
        {!crResult && <div style={{textAlign:"center",padding:20}}>
          <button onClick={async()=>{
            setLoading(true); setCrResult(null);
            const uspList = USPS.map(u=>`${u.icon}${u.label}(${u.sub})`).join(", ");
            const r = await callAI(
              "ZEEKR 7X 크리에이터 협업 전략가. 반드시 순수 JSON만 반환. markdown 코드블록 없이. 한국어.",
              `ZEEKR 7X는 다음 12개 USP를 가진 프리미엄 전기 SUV입니다: ${uspList}

두 가지 접근으로 크리에이터 매칭 결과를 JSON으로 반환해:
{
  "uspMatch": [
    {
      "uspCombination": "활용할 USP 1~2개 (아이콘+이름)",
      "uspReason": "이 USP(조합)로 왜 이 크리에이터인지 1줄",
      "category": "크리에이터 카테고리 (캠핑/육아/테크/과학/먹방/ASMR/여행/라이프스타일 등 — 자동차 제외)",
      "categoryIcon": "카테고리 이모지",
      "channelName": "실제 한국 유튜브 채널명",
      "subscribers": "추정 구독자수",
      "channelDesc": "채널 특징 1줄",
      "collabTitle": "협업 콘텐츠 제목",
      "collabConcept": "어떤 콘텐츠를 어떻게 만들지 구체적으로 2~3줄",
      "format": "숏폼/롱폼/시리즈",
      "impact": "예상 효과 1줄"
    }
  ],
  "celebMatch": [
    {
      "channelName": "셀럽/메가 유튜버 채널명",
      "subscribers": "구독자수",
      "channelDesc": "채널 특징 1줄",
      "targetOverlap": "ZEEKR 7X 타겟과 이 셀럽의 시청자가 왜 겹치는지 1줄",
      "storyAngle": "스토리 앵글 제목 (예: '802km 무충전 제주 일주')",
      "storyDetail": "이 셀럽의 콘텐츠 스타일에 맞춘 구체적 스토리 2~3줄. ZEEKR 7X가 자연스럽게 녹아드는 방식",
      "uspHighlight": "자연스럽게 노출되는 USP 1~2개",
      "format": "숏폼/롱폼/시리즈/라이브",
      "impact": "예상 효과 1줄"
    }
  ]
}
uspMatch는 5개: 모두 자동차 카테고리가 아닌 다른 카테고리(캠핑/육아/테크/과학/ASMR/먹방/여행/라이프스타일 등)에서 추천. 각각 다른 USP 또는 USP 조합을 활용. 같은 카테고리 중복 최소화.
celebMatch는 3개: 구독자 50만 이상의 한국 셀럽/메가 유튜버. USP를 직접 설명하지 않더라도 ZEEKR 7X의 브랜드 임팩트를 줄 수 있는 인물. 각각 다른 스토리 앵글.`
            );
            setCrResult(typeof r === "object" && r.uspMatch ? r : null); setLoading(false);
          }} disabled={loading}
            style={{padding:"16px 44px",borderRadius:12,border:"none",background:loading?"#1e293b":"linear-gradient(135deg,#f59e0b,#d97706)",color:loading?"#475569":"#fff",fontSize:15,fontWeight:700,cursor:loading?"not-allowed":"pointer",fontFamily:FONT,boxShadow:loading?"none":"0 6px 24px rgba(245,158,11,0.2)"}}>
            {loading?"⏳ AI 분석 중...":"🤝 AI 크리에이터 매칭 분석"}
          </button>
        </div>}

        {/* Results */}
        {crResult && <>
          {/* Regenerate */}
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
            <Tag c="#f59e0b">AI 실시간 생성</Tag>
            <button onClick={()=>setCrResult(null)} style={{marginLeft:"auto",padding:"7px 18px",borderRadius:8,border:"1px solid rgba(255,255,255,0.08)",background:"transparent",color:"#64748b",fontSize:12,cursor:"pointer",fontFamily:FONT}}>↻ 다른 조합으로 재분석</button>
          </div>

          {/* ── SECTION 1: USP → Creator ── */}
          <div style={{marginBottom:40}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
              <div style={{width:6,height:24,borderRadius:3,background:"#3b82f6"}} />
              <div>
                <div style={{fontSize:18,fontWeight:900}}>USP → 크리에이터 매칭</div>
                <div style={{fontSize:12,color:"#64748b",marginTop:2}}>각 USP를 가장 잘 전달할 수 있는 비자동차 카테고리 크리에이터</div>
              </div>
            </div>
            {(crResult.uspMatch||[]).map((cr,i) => (
              <div key={i} style={{...G,padding:0,marginBottom:14,overflow:"hidden"}}>
                <div style={{display:"flex"}}>
                  <div style={{width:200,flexShrink:0,padding:20,background:"rgba(59,130,246,0.03)",borderRight:"1px solid rgba(255,255,255,0.04)",display:"flex",flexDirection:"column",gap:8}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{fontSize:18}}>{cr.categoryIcon}</span>
                      <span style={{fontSize:11,fontWeight:700,color:"#3b82f6"}}>{cr.category}</span>
                    </div>
                    <div><div style={{fontSize:15,fontWeight:900,marginBottom:3}}>{cr.channelName}</div><div style={{fontSize:11,color:"#64748b"}}>{cr.channelDesc}</div></div>
                    <div style={{fontSize:12,fontWeight:700,color:"#94a3b8",marginTop:"auto"}}>구독 {cr.subscribers}</div>
                  </div>
                  <div style={{flex:1,padding:20}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                      <div style={{width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,#3b82f6,#06b6d4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:"#fff"}}>{i+1}</div>
                      <Tag c="#3b82f6">{cr.uspCombination}</Tag>
                    </div>
                    <div style={{fontSize:12,color:"#94a3b8",marginBottom:10}}>{cr.uspReason}</div>
                    <div style={{...G,padding:14,marginBottom:10,borderColor:"rgba(59,130,246,0.1)",background:"rgba(59,130,246,0.03)"}}>
                      <div style={{fontSize:14,fontWeight:800,marginBottom:4}}>{cr.collabTitle}</div>
                      <div style={{fontSize:12,color:"#94a3b8",lineHeight:1.6}}>{cr.collabConcept}</div>
                    </div>
                    <div style={{display:"flex",gap:6}}><Tag c="#06b6d4">{cr.format}</Tag><span style={{fontSize:11,color:"#475569",display:"flex",alignItems:"center",gap:4}}>📊 {cr.impact}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── SECTION 2: Celeb → Story ── */}
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
              <div style={{width:6,height:24,borderRadius:3,background:"#f59e0b"}} />
              <div>
                <div style={{fontSize:18,fontWeight:900}}>셀럽 → 스토리 설계</div>
                <div style={{fontSize:12,color:"#64748b",marginTop:2}}>타겟이 겹치는 셀럽/메가 유튜버 + ZEEKR 7X가 자연스럽게 녹아드는 스토리 앵글</div>
              </div>
            </div>
            {(crResult.celebMatch||[]).map((cr,i) => (
              <div key={i} style={{...G,padding:0,marginBottom:14,overflow:"hidden"}}>
                <div style={{display:"flex"}}>
                  <div style={{width:200,flexShrink:0,padding:20,background:"rgba(245,158,11,0.03)",borderRight:"1px solid rgba(255,255,255,0.04)",display:"flex",flexDirection:"column",gap:8}}>
                    <span style={{fontSize:20}}>⭐</span>
                    <div><div style={{fontSize:15,fontWeight:900,marginBottom:3}}>{cr.channelName}</div><div style={{fontSize:11,color:"#64748b"}}>{cr.channelDesc}</div></div>
                    <div style={{fontSize:12,fontWeight:700,color:"#94a3b8",marginTop:"auto"}}>구독 {cr.subscribers}</div>
                  </div>
                  <div style={{flex:1,padding:20}}>
                    <div style={{fontSize:12,color:"#f59e0b",fontWeight:700,marginBottom:8}}>🎯 타겟 오버랩: {cr.targetOverlap}</div>
                    <div style={{...G,padding:14,marginBottom:10,borderColor:"rgba(245,158,11,0.1)",background:"rgba(245,158,11,0.03)"}}>
                      <div style={{fontSize:14,fontWeight:800,color:"#fbbf24",marginBottom:6}}>📐 "{cr.storyAngle}"</div>
                      <div style={{fontSize:13,color:"#e2e8f0",lineHeight:1.65}}>{cr.storyDetail}</div>
                    </div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}><Tag c="#f59e0b">{cr.format}</Tag><Tag c="#3b82f6">{cr.uspHighlight}</Tag><span style={{fontSize:11,color:"#475569",display:"flex",alignItems:"center",gap:4}}>📊 {cr.impact}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>}
      </div>}

      {loading&&<div style={{position:"fixed",bottom:32,right:32,...G,padding:"14px 24px",display:"flex",alignItems:"center",gap:10,zIndex:200,borderColor:"rgba(59,130,246,0.15)"}}><div style={{width:8,height:8,borderRadius:"50%",background:"#3b82f6",animation:"pulse 1.2s infinite"}}/><span style={{fontSize:13,color:"#60a5fa",fontWeight:600}}>AI 생성 중...</span></div>}
      <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#1e293b;border-radius:3px}`}</style>
    </div>
  );
}
