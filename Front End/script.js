// ================================================================
// CampusNav — script.js
// Road coordinates verified from OpenStreetMap by user
// Spine junctions: confirmed real GPS clicks on campus roads
// ================================================================

// ── VERIFIED JUNCTION POINTS (clicked on OSM by user) ────────────
// J1 = 28.919795, 77.128389  — inside main gate, road splits
// J2 = 28.919345, 77.129784  — mid spine junction
// J3 = 28.919340, 77.130287  — Admin Block junction
// J4 = 28.919312, 77.131242  — Royal Cafe junction
// J5 = 28.919208, 77.131758  — ATM / Hospital junction

const R = {

  // ── ENTRY ROADS ──────────────────────────────────────────────

  // Parking → Main Gate (straight north boundary road)
  "PKG_GATE": [
    [28.920020326147267, 77.12665093612526],
    [28.920020326147267, 77.12715519140387],
    [28.920020326147267, 77.12780965038247]
  ],

  // Main Gate → J1 (curves inward to first campus junction)
  "GATE_J1": [
    [28.920020326147267, 77.12780965038247],
    [28.919862154676757, 77.1278487545458],
    [28.91983676896509, 77.12792521540732],
    [28.919842618125045, 77.12799919534295],
    [28.919857282298352, 77.12823188100377],
    [28.919848307925697, 77.12837343425066]   // J1
  ],

  // ── HOSTEL LOOP ───────────────────────────────────────────────

  // J1 → Boys Hostel (short south branch)
  "J1_BOYS": [
    [28.919848307925697, 77.12837343425066],  // J1
    [28.91974734603804, 77.12837608194299],
    [28.919585352410696, 77.12835462427157],
    [28.919503181633438, 77.12834657764478],
    [28.919521963531125, 77.12826879358586]   // Boys Hostel
  ],

  // Boys Hostel → Girls Hostel (south then curves west)
  "BOYS_GIRLS": [
    [28.919521963531125, 77.12826879358586],  // Boys Hostel
    [28.919503181633438, 77.12834657764478],
    [28.91942101079107, 77.12834389543586],
    [28.919289524979476, 77.12834658192142],
    [28.91908527120173, 77.12834121750356],
    [28.918709631015524, 77.12834121750589],
    [28.91861806851499, 77.12833853529696],
    [28.918580564776224, 77.12833459096854],
    [28.91856563725355, 77.1283808804682],
    [28.91856776975692, 77.12852705783554]   // Girls Hostel
  ],

  // Girls Hostel → Stationery (west along bottom)
  "GIRLS_STAT": [
    [28.91856776975692, 77.12852705783554],  // Girls Hostel
    [28.918521633030593, 77.12852453351326],
    [28.918456042655194, 77.12852347810473]   // Stationery
  ],

  // Stationery → J1 (north up west boundary back to junction)
  "STAT_J1": [
    [28.918456042655194, 77.12852347810473],  // Stationery
    [28.918521633030593, 77.12852453351326],
    [28.91856776975692, 77.12852705783554],
    [28.91856563725355, 77.1283808804682],
    [28.918580564776224, 77.12833459096854],
    [28.91861806851499, 77.12833853529696],
    [28.918709631015524, 77.12834121750589],
    [28.91908527120173, 77.12834121750356],
    [28.919289524979476, 77.12834658192142],
    [28.91942101079107, 77.12834389543586],
    [28.919848307925697, 77.12837343425066]   // J1
  ],

  // ── MAIN SPINE ROAD (using verified OSM junction coords) ──────

  // J1 → J2 (spine going east, stays inside campus ~lat 28.9193)
  "J1_J2": [
    [28.919848307925697, 77.12837343425066],  // J1
    [28.919788667600347, 77.12855869800921],
    [28.919748881688133, 77.12866832271702],
    [28.919695053664963, 77.12880468515843],
    [28.91962484315797, 77.12898115420025],
    [28.919563994013444, 77.12916564456215],
    [28.919468039520726, 77.12940361039128],
    [28.919411870995965, 77.12954532037942],
    [28.91935804279789, 77.12969505168763],
    [28.91934868136926, 77.12982339280894]   // J2
  ],

  // J2 → J3/Admin (short east segment)
  "J2_ADMIN": [
    [28.91934868136926, 77.12982339280894],  // J2
    [28.91933819699102, 77.130030156685],
    [28.919319556849896, 77.13028393022535]   // Admin Block / J3
  ],

  // Auditorium branch south from Admin junction
  "ADMIN_AUD": [
    [28.919319556849896, 77.13028393022535],  // Admin / J3
    [28.919313685165815, 77.13043077836718],
    [28.919146961571567, 77.13042848348229],
    [28.918921984730357, 77.13041012440299],
    [28.918926843329732, 77.13017051754433],
    [28.91873772825476, 77.13017155994183]   // Auditorium
  ],

  // J3/Admin → Engineering Block junction (east along top road)
  "ADMIN_ENG_JCT": [
    [28.919319556849896, 77.13028393022535],  // Admin / J3
    [28.919313685165815, 77.13043077836718]   // Engineering junction
  ],

  // Engineering Block branch (south from top road)
  "ENG_BRANCH": [
    [28.919313685165815, 77.13043077836718],  // Engineering junction on top road
    [28.919146961571567, 77.13042848348229],
    [28.918921984730357, 77.13041012440299]   // Engineering Block
  ],

  // Engineering junction → J4/Royal Cafe (east along top road)
  "ENG_RC": [
    [28.919313685165815, 77.13043077836718],  // Engineering junction
    [28.91929726427407, 77.13074193596269],
    [28.919299612016133, 77.13094041942342],
    [28.919290221047582, 77.13112012742164],
    [28.919238548127094, 77.13111473529332]   // J4 / Royal Cafe junction
  ],

  // Royal Cafe point (just off junction)
  "RC_POINT": [
    [28.919290221047582, 77.13112012742164],  // J4
    [28.919238548127094, 77.13111473529332]   // Royal Cafe
  ],

  // J4 → J5/ATM (east along road)
  "RC_ATM": [
    [28.919290221047582, 77.13112012742164],  // J4
    [28.91928080749496, 77.13125152796583],
    [28.91926906878198, 77.13137490957655]   // J5 / ATM junction
  ],

  // ATM point (just off J5)
  "ATM_POINT": [
    [28.91926906878198, 77.13137490957655],  // J5
    [28.919130581556207, 77.13136685308442]   // ATM — slight south-west from junction
  ],

  // Library road (south from ATM junction area)
  "LIB_ROAD": [
    [28.91926906878198, 77.13137490957655],  // J5
    [28.919130581556207, 77.13136685308442],
    [28.91906016606972, 77.13137226412908],
    [28.91902729760018, 77.13123547147372],
    [28.91901086336148, 77.13118182729514],
    [28.91890286687111, 77.131149640788],
    [28.918834813667672, 77.13114155308442],
    [28.918715078218305, 77.131157646338],
    [28.918565923169236, 77.13115959180695],
    [28.91842057420772, 77.13116674933075],
    [28.918387729797146, 77.13116401752119],
    [28.918406811307506, 77.13131933370579],
    [28.918628465209203, 77.13131912764855],
    [28.9186973459573, 77.13131408321019]   // Library
  ],

  // J5 → Hospital (continuing east then south)
  "J5_HOSP": [
    [28.91926906878198, 77.13137490957655],  // J5
    [28.919269046469445, 77.13157847658947],
    [28.919257086457115, 77.13176001085445],
    [28.919243417869943, 77.13200400852246],
    [28.91924000072283, 77.1320723278695],
    [28.919214372116148, 77.1321347912725],
    [28.919168240608148, 77.13222067845163],
    [28.91911014905036, 77.13232218148151],
    [28.919009343034613, 77.13225971807852],
    [28.918915371236775, 77.1321972546755],
    [28.918870948175453, 77.1321699269367]   // Hospital
  ],

  // Hospital → Sports Ground
  "HOSP_SPG": [
    [28.918870948175453, 77.1321699269367],  // Hospital
    [28.918906828341836, 77.132166022974],
    [28.918925622709764, 77.1321972546755],
    [28.91901617734387, 77.13225971807852],
    [28.91911356620172, 77.13233584535094],
    [28.919050348883356, 77.13246272413829],
    [28.919023011652648, 77.13253104348533],
    [28.91898713152644, 77.13262669057119]   // Sports Ground
  ],
  // J5 → Sports Ground DIRECT (bypasses Hospital, uses right side of loop)
  "J5_SPG": [
    [28.91926906878198, 77.13137490957655],
    [28.919269046469445, 77.13157847658947],
    [28.919257086457115, 77.13176001085445],
    [28.919243417869943, 77.13200400852246],
    [28.91924000072283, 77.1320723278695],
    [28.919214372116148, 77.1321347912725],
    [28.919168240608148, 77.13222067845163],
    [28.91911014905036, 77.13232218148151],
    [28.91911356620172, 77.13233584535094],
    [28.919050348883356, 77.13246272413829],
    [28.919023011652648, 77.13253104348533],
    [28.91898713152644, 77.13262669057119]   // Sports Ground
  ]

};

// ── NODE POSITIONS ────────────────────────────────────────────────
const NODE = {
  "Parking Area":                  [28.920020326147267, 77.12665093612526],
  "Main Gate":                     [28.920020326147267, 77.12780965038247],
  "Boys Hostel":                   [28.919521963531125, 77.12826879358586],
  "Girls Hostel":                  [28.91856776975692, 77.12852705783554],
  "Stationery and Bunnys Kitchen": [28.918456042655194, 77.12852347810473],
  "Admin Block":                   [28.919319556849896, 77.13028393022535],
  "Auditorium":                    [28.91873772825476, 77.13017155994183],
  "Engineering Block":             [28.918921984730357, 77.13041012440299],
  "Royal Cafe":                    [28.918909922520608, 77.13111015094063],
  "ATM":                           [28.919130581556207, 77.13136685308442],
  "Library":                       [28.9186973459573, 77.13131408321019],
  "Hospital":                      [28.918870948175453, 77.1321699269367],
  "Sports Ground":                 [28.91898713152644, 77.13262669057119]
};

function seg(key) { return R[key]; }
function rev(key) { return [...R[key]].reverse(); }
function joinSegs(...parts) {
  const result = [];
  for (const coords of parts) {
    if (result.length === 0) result.push(...coords);
    else result.push(...coords.slice(1));
  }
  return result;
}

// ── ROUTE TABLE ───────────────────────────────────────────────────
// Every route built from real road segments.
// Left side (Parking/Gate/Hostels/Stationery) connects to right side via J1 → J2 → Admin spine.

const ROUTES = {

  // ── ENTRY ─────────────────────────────────────────────────────
  "Parking Area|||Main Gate":      joinSegs(seg("PKG_GATE")),
  "Main Gate|||Parking Area":      joinSegs(rev("PKG_GATE")),
  "Main Gate|||Boys Hostel":       joinSegs(seg("GATE_J1"), seg("J1_BOYS")),
  "Boys Hostel|||Main Gate":       joinSegs(rev("J1_BOYS"), rev("GATE_J1")),
  "Main Gate|||Girls Hostel":      joinSegs(seg("GATE_J1"), seg("J1_BOYS"), seg("BOYS_GIRLS")),
  "Girls Hostel|||Main Gate":      joinSegs(rev("BOYS_GIRLS"), rev("J1_BOYS"), rev("GATE_J1")),
  "Main Gate|||Stationery and Bunnys Kitchen": joinSegs(seg("GATE_J1"), rev("STAT_J1")),
  "Stationery and Bunnys Kitchen|||Main Gate": joinSegs(seg("STAT_J1"), rev("GATE_J1")),
  "Parking Area|||Boys Hostel":    joinSegs(seg("PKG_GATE"), seg("GATE_J1"), seg("J1_BOYS")),
  "Boys Hostel|||Parking Area":    joinSegs(rev("J1_BOYS"), rev("GATE_J1"), rev("PKG_GATE")),
  "Parking Area|||Girls Hostel":   joinSegs(seg("PKG_GATE"), seg("GATE_J1"), seg("J1_BOYS"), seg("BOYS_GIRLS")),
  "Girls Hostel|||Parking Area":   joinSegs(rev("BOYS_GIRLS"), rev("J1_BOYS"), rev("GATE_J1"), rev("PKG_GATE")),
  "Parking Area|||Stationery and Bunnys Kitchen": joinSegs(seg("PKG_GATE"), seg("GATE_J1"), rev("STAT_J1")),
  "Stationery and Bunnys Kitchen|||Parking Area": joinSegs(seg("STAT_J1"), rev("GATE_J1"), rev("PKG_GATE")),

  // ── HOSTEL LOOP ───────────────────────────────────────────────
  "Boys Hostel|||Girls Hostel":    joinSegs(seg("BOYS_GIRLS")),
  "Girls Hostel|||Boys Hostel":    joinSegs(rev("BOYS_GIRLS")),
  "Girls Hostel|||Stationery and Bunnys Kitchen": joinSegs(seg("GIRLS_STAT")),
  "Stationery and Bunnys Kitchen|||Girls Hostel": joinSegs(rev("GIRLS_STAT")),
  "Boys Hostel|||Stationery and Bunnys Kitchen": joinSegs(seg("BOYS_GIRLS"), seg("GIRLS_STAT")),
  "Stationery and Bunnys Kitchen|||Boys Hostel": joinSegs(rev("GIRLS_STAT"), rev("BOYS_GIRLS")),

  // ── LEFT SIDE → ADMIN (via J1 → J2 → Admin) ──────────────────
  "Main Gate|||Admin Block":       joinSegs(seg("GATE_J1"), seg("J1_J2"), seg("J2_ADMIN")),
  "Admin Block|||Main Gate":       joinSegs(rev("J2_ADMIN"), rev("J1_J2"), rev("GATE_J1")),
  "Parking Area|||Admin Block":    joinSegs(seg("PKG_GATE"), seg("GATE_J1"), seg("J1_J2"), seg("J2_ADMIN")),
  "Admin Block|||Parking Area":    joinSegs(rev("J2_ADMIN"), rev("J1_J2"), rev("GATE_J1"), rev("PKG_GATE")),
  "Boys Hostel|||Admin Block":     joinSegs(rev("J1_BOYS"), seg("J1_J2"), seg("J2_ADMIN")),
  "Admin Block|||Boys Hostel":     joinSegs(rev("J2_ADMIN"), rev("J1_J2"), seg("J1_BOYS")),
  "Girls Hostel|||Admin Block":    joinSegs(rev("BOYS_GIRLS"), rev("J1_BOYS"), seg("J1_J2"), seg("J2_ADMIN")),
  "Admin Block|||Girls Hostel":    joinSegs(rev("J2_ADMIN"), rev("J1_J2"), seg("J1_BOYS"), seg("BOYS_GIRLS")),
  "Stationery and Bunnys Kitchen|||Admin Block": joinSegs(seg("STAT_J1"), seg("J1_J2"), seg("J2_ADMIN")),
  "Admin Block|||Stationery and Bunnys Kitchen": joinSegs(rev("J2_ADMIN"), rev("J1_J2"), rev("STAT_J1")),

  // ── LEFT SIDE → AUDITORIUM ────────────────────────────────────
  "Main Gate|||Auditorium":        joinSegs(seg("GATE_J1"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_AUD")),
  "Auditorium|||Main Gate":        joinSegs(rev("ADMIN_AUD"), rev("J2_ADMIN"), rev("J1_J2"), rev("GATE_J1")),
  "Parking Area|||Auditorium":     joinSegs(seg("PKG_GATE"), seg("GATE_J1"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_AUD")),
  "Auditorium|||Parking Area":     joinSegs(rev("ADMIN_AUD"), rev("J2_ADMIN"), rev("J1_J2"), rev("GATE_J1"), rev("PKG_GATE")),
  "Boys Hostel|||Auditorium":      joinSegs(rev("J1_BOYS"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_AUD")),
  "Auditorium|||Boys Hostel":      joinSegs(rev("ADMIN_AUD"), rev("J2_ADMIN"), rev("J1_J2"), seg("J1_BOYS")),
  "Girls Hostel|||Auditorium":     joinSegs(rev("BOYS_GIRLS"), rev("J1_BOYS"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_AUD")),
  "Auditorium|||Girls Hostel":     joinSegs(rev("ADMIN_AUD"), rev("J2_ADMIN"), rev("J1_J2"), seg("J1_BOYS"), seg("BOYS_GIRLS")),
  "Stationery and Bunnys Kitchen|||Auditorium": joinSegs(seg("STAT_J1"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_AUD")),
  "Auditorium|||Stationery and Bunnys Kitchen": joinSegs(rev("ADMIN_AUD"), rev("J2_ADMIN"), rev("J1_J2"), rev("STAT_J1")),

  // ── LEFT SIDE → ENGINEERING BLOCK ────────────────────────────
  "Main Gate|||Engineering Block":    joinSegs(seg("GATE_J1"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_BRANCH")),
  "Engineering Block|||Main Gate":    joinSegs(rev("ENG_BRANCH"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), rev("GATE_J1")),
  "Parking Area|||Engineering Block": joinSegs(seg("PKG_GATE"), seg("GATE_J1"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_BRANCH")),
  "Engineering Block|||Parking Area": joinSegs(rev("ENG_BRANCH"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), rev("GATE_J1"), rev("PKG_GATE")),
  "Boys Hostel|||Engineering Block":  joinSegs(rev("J1_BOYS"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_BRANCH")),
  "Engineering Block|||Boys Hostel":  joinSegs(rev("ENG_BRANCH"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), seg("J1_BOYS")),
  "Girls Hostel|||Engineering Block": joinSegs(rev("BOYS_GIRLS"), rev("J1_BOYS"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_BRANCH")),
  "Engineering Block|||Girls Hostel": joinSegs(rev("ENG_BRANCH"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), seg("J1_BOYS"), seg("BOYS_GIRLS")),
  "Stationery and Bunnys Kitchen|||Engineering Block": joinSegs(seg("STAT_J1"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_BRANCH")),
  "Engineering Block|||Stationery and Bunnys Kitchen": joinSegs(rev("ENG_BRANCH"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), rev("STAT_J1")),

  // ── LEFT SIDE → ROYAL CAFE ────────────────────────────────────
  "Main Gate|||Royal Cafe":        joinSegs(seg("GATE_J1"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_POINT")),
  "Royal Cafe|||Main Gate":        joinSegs(rev("RC_POINT"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), rev("GATE_J1")),
  "Parking Area|||Royal Cafe":     joinSegs(seg("PKG_GATE"), seg("GATE_J1"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_POINT")),
  "Royal Cafe|||Parking Area":     joinSegs(rev("RC_POINT"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), rev("GATE_J1"), rev("PKG_GATE")),
  "Boys Hostel|||Royal Cafe":      joinSegs(rev("J1_BOYS"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_POINT")),
  "Royal Cafe|||Boys Hostel":      joinSegs(rev("RC_POINT"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), seg("J1_BOYS")),
  "Girls Hostel|||Royal Cafe":     joinSegs(rev("BOYS_GIRLS"), rev("J1_BOYS"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_POINT")),
  "Royal Cafe|||Girls Hostel":     joinSegs(rev("RC_POINT"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), seg("J1_BOYS"), seg("BOYS_GIRLS")),
  "Stationery and Bunnys Kitchen|||Royal Cafe": joinSegs(seg("STAT_J1"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_POINT")),
  "Royal Cafe|||Stationery and Bunnys Kitchen": joinSegs(rev("RC_POINT"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), rev("STAT_J1")),

  // ── LEFT SIDE → ATM ───────────────────────────────────────────
  "Main Gate|||ATM":               joinSegs(seg("GATE_J1"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("ATM_POINT")),
  "ATM|||Main Gate":               joinSegs(rev("ATM_POINT"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), rev("GATE_J1")),
  "Parking Area|||ATM":            joinSegs(seg("PKG_GATE"), seg("GATE_J1"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("ATM_POINT")),
  "ATM|||Parking Area":            joinSegs(rev("ATM_POINT"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), rev("GATE_J1"), rev("PKG_GATE")),
  "Boys Hostel|||ATM":             joinSegs(rev("J1_BOYS"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("ATM_POINT")),
  "ATM|||Boys Hostel":             joinSegs(rev("ATM_POINT"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), seg("J1_BOYS")),
  "Girls Hostel|||ATM":            joinSegs(rev("BOYS_GIRLS"), rev("J1_BOYS"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("ATM_POINT")),
  "ATM|||Girls Hostel":            joinSegs(rev("ATM_POINT"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), seg("J1_BOYS"), seg("BOYS_GIRLS")),
  "Stationery and Bunnys Kitchen|||ATM": joinSegs(seg("STAT_J1"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("ATM_POINT")),
  "ATM|||Stationery and Bunnys Kitchen": joinSegs(rev("ATM_POINT"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), rev("STAT_J1")),

  // ── LEFT SIDE → LIBRARY ───────────────────────────────────────
  "Main Gate|||Library":           joinSegs(seg("GATE_J1"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("LIB_ROAD")),
  "Library|||Main Gate":           joinSegs(rev("LIB_ROAD"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), rev("GATE_J1")),
  "Parking Area|||Library":        joinSegs(seg("PKG_GATE"), seg("GATE_J1"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("LIB_ROAD")),
  "Library|||Parking Area":        joinSegs(rev("LIB_ROAD"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), rev("GATE_J1"), rev("PKG_GATE")),
  "Boys Hostel|||Library":         joinSegs(rev("J1_BOYS"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("LIB_ROAD")),
  "Library|||Boys Hostel":         joinSegs(rev("LIB_ROAD"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), seg("J1_BOYS")),
  "Girls Hostel|||Library":        joinSegs(rev("BOYS_GIRLS"), rev("J1_BOYS"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("LIB_ROAD")),
  "Library|||Girls Hostel":        joinSegs(rev("LIB_ROAD"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), seg("J1_BOYS"), seg("BOYS_GIRLS")),
  "Stationery and Bunnys Kitchen|||Library": joinSegs(seg("STAT_J1"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("LIB_ROAD")),
  "Library|||Stationery and Bunnys Kitchen": joinSegs(rev("LIB_ROAD"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), rev("STAT_J1")),

  // ── LEFT SIDE → HOSPITAL ──────────────────────────────────────
  "Main Gate|||Hospital":          joinSegs(seg("GATE_J1"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("J5_HOSP")),
  "Hospital|||Main Gate":          joinSegs(rev("J5_HOSP"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), rev("GATE_J1")),
  "Parking Area|||Hospital":       joinSegs(seg("PKG_GATE"), seg("GATE_J1"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("J5_HOSP")),
  "Hospital|||Parking Area":       joinSegs(rev("J5_HOSP"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), rev("GATE_J1"), rev("PKG_GATE")),
  "Boys Hostel|||Hospital":        joinSegs(rev("J1_BOYS"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("J5_HOSP")),
  "Hospital|||Boys Hostel":        joinSegs(rev("J5_HOSP"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), seg("J1_BOYS")),
  "Girls Hostel|||Hospital":       joinSegs(rev("BOYS_GIRLS"), rev("J1_BOYS"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("J5_HOSP")),
  "Hospital|||Girls Hostel":       joinSegs(rev("J5_HOSP"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), seg("J1_BOYS"), seg("BOYS_GIRLS")),
  "Stationery and Bunnys Kitchen|||Hospital": joinSegs(seg("STAT_J1"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("J5_HOSP")),
  "Hospital|||Stationery and Bunnys Kitchen": joinSegs(rev("J5_HOSP"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), rev("STAT_J1")),

  // ── LEFT SIDE → SPORTS GROUND ─────────────────────────────────
  "Main Gate|||Sports Ground":     joinSegs(seg("GATE_J1"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("J5_SPG")),
  "Sports Ground|||Main Gate":     joinSegs(rev("J5_SPG"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), rev("GATE_J1")),
  "Parking Area|||Sports Ground":  joinSegs(seg("PKG_GATE"), seg("GATE_J1"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("J5_SPG")),
  "Sports Ground|||Parking Area":  joinSegs(rev("J5_SPG"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), rev("GATE_J1"), rev("PKG_GATE")),
  "Boys Hostel|||Sports Ground":   joinSegs(rev("J1_BOYS"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("J5_SPG")),
  "Sports Ground|||Boys Hostel":   joinSegs(rev("J5_SPG"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), seg("J1_BOYS")),
  "Girls Hostel|||Sports Ground":  joinSegs(rev("BOYS_GIRLS"), rev("J1_BOYS"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("J5_SPG")),
  "Sports Ground|||Girls Hostel":  joinSegs(rev("J5_SPG"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), seg("J1_BOYS"), seg("BOYS_GIRLS")),
  "Stationery and Bunnys Kitchen|||Sports Ground": joinSegs(seg("STAT_J1"), seg("J1_J2"), seg("J2_ADMIN"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("J5_SPG")),
  "Sports Ground|||Stationery and Bunnys Kitchen": joinSegs(rev("J5_SPG"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), rev("J2_ADMIN"), rev("J1_J2"), rev("STAT_J1")),

  // ── RIGHT SIDE CONNECTIONS ────────────────────────────────────
  "Admin Block|||Auditorium":          joinSegs(seg("ADMIN_AUD")),
  "Auditorium|||Admin Block":          joinSegs(rev("ADMIN_AUD")),
  "Admin Block|||Engineering Block":   joinSegs(seg("ADMIN_ENG_JCT"), seg("ENG_BRANCH")),
  "Engineering Block|||Admin Block":   joinSegs(rev("ENG_BRANCH"), rev("ADMIN_ENG_JCT")),
  "Admin Block|||Royal Cafe":          joinSegs(seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_POINT")),
  "Royal Cafe|||Admin Block":          joinSegs(rev("RC_POINT"), rev("ENG_RC"), rev("ADMIN_ENG_JCT")),
  "Admin Block|||ATM":                 joinSegs(seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("ATM_POINT")),
  "ATM|||Admin Block":                 joinSegs(rev("ATM_POINT"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT")),
  "Admin Block|||Library":             joinSegs(seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("LIB_ROAD")),
  "Library|||Admin Block":             joinSegs(rev("LIB_ROAD"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT")),
  "Admin Block|||Hospital":            joinSegs(seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("J5_HOSP")),
  "Hospital|||Admin Block":            joinSegs(rev("J5_HOSP"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT")),
  "Admin Block|||Sports Ground":       joinSegs(seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("J5_SPG")),
  "Sports Ground|||Admin Block":       joinSegs(rev("J5_SPG"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT")),

  "Auditorium|||Engineering Block":    joinSegs(rev("ADMIN_AUD"), seg("ADMIN_ENG_JCT"), seg("ENG_BRANCH")),
  "Engineering Block|||Auditorium":    joinSegs(rev("ENG_BRANCH"), rev("ADMIN_ENG_JCT"), seg("ADMIN_AUD")),
  "Auditorium|||Royal Cafe":           joinSegs(rev("ADMIN_AUD"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_POINT")),
  "Royal Cafe|||Auditorium":           joinSegs(rev("RC_POINT"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), seg("ADMIN_AUD")),
  "Auditorium|||ATM":                  joinSegs(rev("ADMIN_AUD"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("ATM_POINT")),
  "ATM|||Auditorium":                  joinSegs(rev("ATM_POINT"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), seg("ADMIN_AUD")),
  "Auditorium|||Library":              joinSegs(rev("ADMIN_AUD"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("LIB_ROAD")),
  "Library|||Auditorium":              joinSegs(rev("LIB_ROAD"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), seg("ADMIN_AUD")),
  "Auditorium|||Hospital":             joinSegs(rev("ADMIN_AUD"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("J5_HOSP")),
  "Hospital|||Auditorium":             joinSegs(rev("J5_HOSP"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), seg("ADMIN_AUD")),
  "Auditorium|||Sports Ground":        joinSegs(rev("ADMIN_AUD"), seg("ADMIN_ENG_JCT"), seg("ENG_RC"), seg("RC_ATM"), seg("J5_SPG")),
  "Sports Ground|||Auditorium":        joinSegs(rev("J5_SPG"), rev("RC_ATM"), rev("ENG_RC"), rev("ADMIN_ENG_JCT"), seg("ADMIN_AUD")),

  "Engineering Block|||Royal Cafe":    joinSegs(rev("ENG_BRANCH"), seg("ENG_RC"), seg("RC_POINT")),
  "Royal Cafe|||Engineering Block":    joinSegs(rev("RC_POINT"), rev("ENG_RC"), seg("ENG_BRANCH")),
  "Engineering Block|||ATM":           joinSegs(rev("ENG_BRANCH"), seg("ENG_RC"), seg("RC_ATM"), seg("ATM_POINT")),
  "ATM|||Engineering Block":           joinSegs(rev("ATM_POINT"), rev("RC_ATM"), rev("ENG_RC"), seg("ENG_BRANCH")),
  "Engineering Block|||Library":       joinSegs(rev("ENG_BRANCH"), seg("ENG_RC"), seg("RC_ATM"), seg("LIB_ROAD")),
  "Library|||Engineering Block":       joinSegs(rev("LIB_ROAD"), rev("RC_ATM"), rev("ENG_RC"), seg("ENG_BRANCH")),
  "Engineering Block|||Hospital":      joinSegs(rev("ENG_BRANCH"), seg("ENG_RC"), seg("RC_ATM"), seg("J5_HOSP")),
  "Hospital|||Engineering Block":      joinSegs(rev("J5_HOSP"), rev("RC_ATM"), rev("ENG_RC"), seg("ENG_BRANCH")),
  "Engineering Block|||Sports Ground": joinSegs(rev("ENG_BRANCH"), seg("ENG_RC"), seg("RC_ATM"), seg("J5_SPG")),
  "Sports Ground|||Engineering Block": joinSegs(rev("J5_SPG"), rev("RC_ATM"), rev("ENG_RC"), seg("ENG_BRANCH")),

  "Royal Cafe|||ATM":                  joinSegs(rev("RC_POINT"), seg("RC_ATM"), seg("ATM_POINT")),
  "ATM|||Royal Cafe":                  joinSegs(rev("ATM_POINT"), rev("RC_ATM"), seg("RC_POINT")),
  "Royal Cafe|||Library":              joinSegs(rev("RC_POINT"), seg("RC_ATM"), seg("LIB_ROAD")),
  "Library|||Royal Cafe":              joinSegs(rev("LIB_ROAD"), rev("RC_ATM"), seg("RC_POINT")),
  "Royal Cafe|||Hospital":             joinSegs(rev("RC_POINT"), seg("RC_ATM"), seg("J5_HOSP")),
  "Hospital|||Royal Cafe":             joinSegs(rev("J5_HOSP"), rev("RC_ATM"), seg("RC_POINT")),
  "Royal Cafe|||Sports Ground":        joinSegs(rev("RC_POINT"), seg("RC_ATM"), seg("J5_SPG")),
  "Sports Ground|||Royal Cafe":        joinSegs(rev("J5_SPG"), rev("RC_ATM"), seg("RC_POINT")),

  "ATM|||Library":                     joinSegs(rev("ATM_POINT"), seg("LIB_ROAD")),
  "Library|||ATM":                     joinSegs(rev("LIB_ROAD"), seg("ATM_POINT")),
  "ATM|||Hospital":                    joinSegs(rev("ATM_POINT"), seg("J5_HOSP")),
  "Hospital|||ATM":                    joinSegs(rev("J5_HOSP"), seg("ATM_POINT")),
  "ATM|||Sports Ground":               joinSegs(rev("ATM_POINT"), seg("J5_SPG")),
  "Sports Ground|||ATM":               joinSegs(rev("J5_SPG"), seg("ATM_POINT")),

  "Library|||Hospital":                joinSegs(rev("LIB_ROAD"), seg("J5_HOSP")),
  "Hospital|||Library":                joinSegs(rev("J5_HOSP"), seg("LIB_ROAD")),
  "Library|||Sports Ground":           joinSegs(rev("LIB_ROAD"), seg("J5_SPG")),
  "Sports Ground|||Library":           joinSegs(rev("J5_SPG"), seg("LIB_ROAD")),

  "Hospital|||Sports Ground":          joinSegs(seg("HOSP_SPG")),
  "Sports Ground|||Hospital":          joinSegs(rev("HOSP_SPG"))
};

// ── NAME NORMALISER ───────────────────────────────────────────────
const NAME_MAP = {
  'parking area': 'Parking Area', 'parking': 'Parking Area',
  'main gate': 'Main Gate', 'gate': 'Main Gate', 'entrance': 'Main Gate',
  'boys hostel': 'Boys Hostel', 'boys': 'Boys Hostel',
  'girls hostel': 'Girls Hostel', 'girls': 'Girls Hostel',
  'stationery and bunnys kitchen': 'Stationery and Bunnys Kitchen',
  "stationery and bunny's kitchen": 'Stationery and Bunnys Kitchen',
  'stationery': 'Stationery and Bunnys Kitchen', 'bunny': 'Stationery and Bunnys Kitchen',
  'engineering block': 'Engineering Block', 'engineering': 'Engineering Block',
  'dept': 'Engineering Block', 'department': 'Engineering Block',
  'auditorium': 'Auditorium', 'library': 'Library',
  'admin block': 'Admin Block', 'admin': 'Admin Block',
  'administration block': 'Admin Block', 'administration': 'Admin Block',
  'royal cafe': 'Royal Cafe', "royal's cafe": 'Royal Cafe',
  'royals cafe': 'Royal Cafe', 'royal': 'Royal Cafe', 'cafe': 'Royal Cafe', 'cafeteria': 'Royal Cafe',
  'atm': 'ATM', 'atm bank': 'ATM', 'bank': 'ATM',
  'hospital': 'Hospital',
  'sports ground': 'Sports Ground', 'sports': 'Sports Ground', 'ground': 'Sports Ground'
};

function normaliseName(raw) {
  if (!raw) return null;
  const key = raw.toLowerCase().trim().replace(/[^a-z0-9 ']/g, '');
  if (NAME_MAP[key]) return NAME_MAP[key];
  for (const [k, v] of Object.entries(NAME_MAP)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return null;
}

function findCampusRoute(fromName, toName) {
  const from = normaliseName(fromName);
  const to   = normaliseName(toName);
  if (!from || !to) return null;
  if (from === to) return { coords: [NODE[from]], distanceM: 0, durationMin: 0 };
  const coords = ROUTES[from + '|||' + to];
  if (!coords || coords.length < 2) return null;
  let distanceM = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    const dlat = (coords[i+1][0] - coords[i][0]) * Math.PI / 180;
    const dlng = (coords[i+1][1] - coords[i][1]) * Math.PI / 180;
    const a = Math.sin(dlat/2)**2 + Math.cos(coords[i][0]*Math.PI/180)*Math.cos(coords[i+1][0]*Math.PI/180)*Math.sin(dlng/2)**2;
    distanceM += 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  }
  return { coords, distanceM: Math.round(distanceM), durationMin: Math.max(1, Math.round(distanceM/80)) };
}

// ── MAP UI ────────────────────────────────────────────────────────
const API_BASE = 'http://192.168.56.1:5000/api';
let map, routePolyline, markers = [], allLocations = [], currentLocation = null;
const CAMPUS_CENTER = [28.9192, 77.1295];
const CAT_ICONS = { library:'📚', department:'🏫', cafeteria:'🍽️', administrative:'🏢', hostel:'🏠', sports:'⚽', facility:'🏪', auditorium:'🎭', entrance:'🚪', parking:'🅿️', default:'📍' };
function getCatIcon(cat) { return CAT_ICONS[(cat||'').toLowerCase()] || CAT_ICONS.default; }

function initMap() {
  if (!document.getElementById('map')) return;
  map = L.map('map', { zoomControl: true }).setView(CAMPUS_CENTER, 17);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors', maxZoom: 20 }).addTo(map);
  routePolyline = L.polyline([], { color: '#1a6fc4', weight: 5, opacity: 0.85 }).addTo(map);
  loadLocations();
  checkAuthState();
}

async function loadLocations() {
  try {
    const res = await fetch(`${API_BASE}/locations`);
    if (!res.ok) throw new Error();
    allLocations = await res.json();
    renderLocationsList(allLocations);
    placeMarkers(allLocations);
    populateFromSelect(allLocations);
  } catch {
    document.getElementById('locations-list').innerHTML = '<p class="muted-text">Could not load locations. Is the server running?</p>';
  }
}

function placeMarkers(locations) {
  markers.forEach(m => map.removeLayer(m)); markers = [];
  locations.forEach(loc => {
    if (!loc.latitude || !loc.longitude) return;
    const icon = L.divIcon({ className:'', html:`<div style="font-size:22px;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3))">${getCatIcon(loc.category)}</div>`, iconSize:[28,28], iconAnchor:[14,28] });
    markers.push(L.marker([loc.latitude, loc.longitude], { icon }).addTo(map).on('click', () => showPopup(loc)));
  });
}

function renderLocationsList(locations) {
  const el = document.getElementById('locations-list');
  if (!el) return;
  if (!locations.length) { el.innerHTML = '<p class="muted-text">No locations found.</p>'; return; }
  el.innerHTML = locations.map(loc => `<div class="location-item" onclick="showPopup(${JSON.stringify(loc).replace(/"/g,'&quot;')})"><span class="loc-icon">${getCatIcon(loc.category)}</span><div class="loc-info"><strong>${loc.name}</strong><small> (${(loc.category||'').charAt(0).toUpperCase()+(loc.category||'').slice(1)})</small></div></div>`).join('');
}

function searchLocations() {
  const q = document.getElementById('search-input').value.toLowerCase().trim();
  const f = q ? allLocations.filter(l => l.name.toLowerCase().includes(q)||(l.category||'').toLowerCase().includes(q)) : allLocations;
  renderLocationsList(f); placeMarkers(f);
}

function filterCategory(cat, e) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  if (e && e.target) e.target.classList.add('active');
  const f = cat==='all' ? allLocations : allLocations.filter(l=>(l.category||'').toLowerCase()===cat.toLowerCase());
  renderLocationsList(f); placeMarkers(f);
}

function showPopup(loc) {
  currentLocation = loc;
  document.getElementById('popup-name').textContent = loc.name;
  document.getElementById('popup-category').textContent = getCatIcon(loc.category)+' '+(loc.category||'');
  document.getElementById('popup-desc').textContent = loc.description||'';
  document.getElementById('travel-time').classList.add('hidden');
  document.getElementById('info-popup').classList.remove('hidden');
  if (loc.latitude && loc.longitude) map.flyTo([loc.latitude, loc.longitude], 18, { duration:1 });
  document.getElementById('save-btn').textContent = getSavedPlaces().some(s=>s.id===loc.id) ? '★ Saved' : '⭐ Save';
}

function closePopup() { document.getElementById('info-popup').classList.add('hidden'); currentLocation=null; clearRoute(); }

function populateFromSelect(locations) {
  const sel = document.getElementById('from-select');
  if (!sel) return;
  sel.innerHTML = '<option value="Main Gate">🚪 Main Gate (Default)</option>';
  (locations||allLocations).forEach(loc => {
    if (loc.name==='Main Gate') return;
    const opt = document.createElement('option');
    opt.value = loc.name; opt.textContent = getCatIcon(loc.category)+' '+loc.name;
    sel.appendChild(opt);
  });
}

function getDirections() {
  if (!currentLocation) return;
  const fromName = document.getElementById('from-select').value;
  const toName   = currentLocation.name;
  const route    = findCampusRoute(fromName, toName);
  if (!route) { alert(`No route found from "${fromName}" to "${toName}".`); return; }
  routePolyline.setLatLngs(route.coords.map(c => L.latLng(c[0], c[1])));
  map.fitBounds(routePolyline.getBounds(), { padding:[40,40] });
  const travelEl = document.getElementById('travel-time');
  travelEl.textContent = `📏 ${(route.distanceM/1000).toFixed(2)} km  •  🚶 ~${route.durationMin} min walking`;
  travelEl.classList.remove('hidden');
}

function clearRoute() { if (routePolyline) routePolyline.setLatLngs([]); }
function getSavedPlaces() { try { return JSON.parse(localStorage.getItem('campusnav_saved')||'[]'); } catch { return []; } }

function saveLocation() {
  if (!localStorage.getItem('campusnav_token')) { alert('Please login to save locations.'); return; }
  if (!currentLocation) return;
  let saved = getSavedPlaces();
  const exists = saved.some(s=>s.id===currentLocation.id);
  saved = exists ? saved.filter(s=>s.id!==currentLocation.id) : [...saved,{id:currentLocation.id,name:currentLocation.name,category:currentLocation.category}];
  document.getElementById('save-btn').textContent = exists ? '⭐ Save' : '★ Saved';
  localStorage.setItem('campusnav_saved', JSON.stringify(saved));
  renderSavedPlaces();
}

function renderSavedPlaces() {
  const el = document.getElementById('saved-list'); if (!el) return;
  const saved = getSavedPlaces(); const token = localStorage.getItem('campusnav_token');
  if (!token) { el.innerHTML='<p class="muted-text">Login to see saved places</p>'; return; }
  if (!saved.length) { el.innerHTML='<p class="muted-text">No saved places yet.</p>'; return; }
  el.innerHTML = saved.map(s=>`<div class="location-item" onclick="jumpToSaved('${s.name}')"><span class="loc-icon">${getCatIcon(s.category)}</span><div class="loc-info"><strong>${s.name}</strong></div></div>`).join('');
}

function jumpToSaved(name) { const loc=allLocations.find(l=>l.name===name); if(loc) showPopup(loc); }

async function loginUser() {
  const email=document.getElementById('login-email').value.trim(), password=document.getElementById('login-password').value, msgEl=document.getElementById('login-msg');
  if (!email||!password) { showMsg(msgEl,'Please fill in all fields.','error'); return; }
  try {
    const res=await fetch(`${API_BASE}/auth/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});
    const data=await res.json();
    if (!res.ok) { showMsg(msgEl,data.error||data.message||'Login failed.','error'); return; }
    localStorage.setItem('campusnav_token',data.token); localStorage.setItem('campusnav_user',data.user?.name||email);
    showMsg(msgEl,'Logged in! Redirecting...','success'); setTimeout(()=>window.location.href='map.html',1000);
  } catch { showMsg(msgEl,'Server error. Is the backend running?','error'); }
}

async function registerUser() {
  const name=document.getElementById('reg-name').value.trim(), email=document.getElementById('reg-email').value.trim(), password=document.getElementById('reg-password').value, msgEl=document.getElementById('register-msg');
  if (!name||!email||!password) { showMsg(msgEl,'Please fill in all fields.','error'); return; }
  try {
    const res=await fetch(`${API_BASE}/auth/register`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,password})});
    const data=await res.json();
    if (!res.ok) { showMsg(msgEl,data.error||data.message||'Registration failed.','error'); return; }
    showMsg(msgEl,'Account created! You can now login.','success'); setTimeout(()=>showTab('login'),1500);
  } catch { showMsg(msgEl,'Server error. Is the backend running?','error'); }
}

function logoutUser() { localStorage.removeItem('campusnav_token'); localStorage.removeItem('campusnav_user'); localStorage.removeItem('campusnav_saved'); window.location.href='index.html'; }

function getUserName() {
  let user=localStorage.getItem('campusnav_user'); if (!user) return null;
  try { const p=JSON.parse(user); if(p&&p.name){localStorage.setItem('campusnav_user',p.name);return p.name;} } catch(e) {}
  return user;
}

function checkAuthState() {
  const token=localStorage.getItem('campusnav_token'), name=getUserName();
  const navUser=document.getElementById('nav-user'), logoutBtn=document.getElementById('logout-btn');
  if (token&&name) { if(navUser){navUser.textContent=`👤 ${name}`;navUser.classList.remove('hidden');} if(logoutBtn)logoutBtn.classList.remove('hidden'); }
  renderSavedPlaces();
}

function showMsg(el,msg,type) { if(!el)return; el.textContent=msg; el.style.color=type==='error'?'#ef4444':'#22c55e'; el.style.display='block'; }

function showTab(tab) {
  document.querySelectorAll('.auth-form').forEach(f=>f.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById(`${tab}-form`).classList.remove('hidden');
  const btns=document.querySelectorAll('.tab-btn');
  if(tab==='login'&&btns[0])btns[0].classList.add('active');
  if(tab==='register'&&btns[1])btns[1].classList.add('active');
}

function toggleDark() { document.body.classList.toggle('dark'); localStorage.setItem('campusnav_dark',document.body.classList.contains('dark')?'1':'0'); }

document.addEventListener('DOMContentLoaded',()=>{
  if(localStorage.getItem('campusnav_dark')==='1')document.body.classList.add('dark');
  const name=getUserName(), token=localStorage.getItem('campusnav_token');
  const navUser=document.getElementById('nav-user'), logoutBtn=document.getElementById('logout-btn');
  if(token&&name){if(navUser){navUser.textContent=`👤 ${name}`;navUser.classList.remove('hidden');}if(logoutBtn)logoutBtn.classList.remove('hidden');}
  if(document.getElementById('map'))initMap();
});
// FLOOR MAP — 5th Floor Engineering Block
const FLOOR_ROOMS = {
  "01":{"name":"Lab 01","type":"Computer Lab","icon":"🖥️"},
  "02":{"name":"Lab 02","type":"Computer Lab","icon":"🖥️"},
  "03":{"name":"Lab 03","type":"Computer Lab","icon":"🖥️"},
  "04":{"name":"Lab 04","type":"Computer Lab","icon":"🖥️"},
  "05":{"name":"Lab 05","type":"Computer Lab","icon":"🖥️"},
  "06":{"name":"Lab 06","type":"Computer Lab","icon":"🖥️"},
  "07":{"name":"Lab 07","type":"Computer Lab","icon":"🖥️"},
  "08":{"name":"Lab 08","type":"Computer Lab","icon":"🖥️"},
  "09":{"name":"Lab 09","type":"Computer Lab","icon":"🖥️"},
  "10":{"name":"Lab 10","type":"Computer Lab","icon":"🖥️"},
  "11":{"name":"Lab 11","type":"Computer Lab","icon":"🖥️"},
  "12":{"name":"Lab 12","type":"Computer Lab","icon":"🖥️"},
  "lift-w":{"name":"Lift Lobby","type":"3 Lifts + EXIT (West)","icon":"🛗"},
  "lobby":{"name":"Lobby / Stairs","type":"Staircase & Waiting Area","icon":"🏢"},
  "mwc":{"name":"Male Staff W/C","type":"Male Washroom","icon":"🚻"},
  "fwc":{"name":"Female Staff W/C","type":"Female Washroom","icon":"🚻"},
  "sr01":{"name":"Staff Room 01","type":"Faculty Room","icon":"👨‍🏫"},
  "sr02":{"name":"Staff Room 02","type":"Faculty Room","icon":"👨‍🏫"},
  "sr03":{"name":"Staff Room 03","type":"Faculty Room","icon":"👨‍🏫"},
  "sr04":{"name":"Staff Room 04","type":"Faculty Room","icon":"👨‍🏫"},
  "sr05":{"name":"Staff Room 05","type":"Faculty Room","icon":"👨‍🏫"},
  "sr06":{"name":"Staff Room 06","type":"Faculty Room","icon":"👨‍🏫"},
  "sr07":{"name":"Staff Room 07","type":"Faculty Room","icon":"👨‍🏫"},
  "sr08":{"name":"Staff Room 08","type":"Faculty Room","icon":"👨‍🏫"},
  "hod":{"name":"HOD Room","type":"Head of Department Office","icon":"🏛️"},
  "hub":{"name":"Hub Room","type":"Shared Faculty Space","icon":"🏢"},
  "lift-r":{"name":"Lift Lobby (East)","type":"3 Lifts + EXIT","icon":"🛗"},
  "wc":{"name":"WC / Toilet","type":"Washroom & Pantry","icon":"🚻"},
  "conf":{"name":"Conference Room","type":"~20 Seats","icon":"📋"},
};

function openFloorMap(){
  document.getElementById('floor-overlay').classList.remove('hidden');
  document.body.style.overflow='hidden';
  setTimeout(()=>{
    document.querySelectorAll('#floor-svg [data-room]').forEach(el=>{
      el.style.cursor='pointer';
      el.addEventListener('click',onRoomClick);
    });
  },80);
}
function closeFloorMap(e){
  if(e&&e.target!==document.getElementById('floor-overlay'))return;
  _resetFM();
}
function closeFloorMapBtn(){_resetFM();}
function _resetFM(){
  document.getElementById('floor-overlay').classList.add('hidden');
  document.body.style.overflow='';
  document.querySelectorAll('#floor-svg .selected').forEach(r=>r.classList.remove('selected'));
  document.getElementById('room-info').classList.add('hidden');
}
function onRoomClick(e){
  const id=e.currentTarget.getAttribute('data-room');
  const info=FLOOR_ROOMS[id];
  if(!info)return;
  document.querySelectorAll('#floor-svg .selected').forEach(r=>r.classList.remove('selected'));
  e.currentTarget.classList.add('selected');
  document.getElementById('room-info-icon').textContent=info.icon;
  document.getElementById('room-info-name').textContent=info.name;
  document.getElementById('room-info-type').textContent=info.type;
  document.getElementById('room-info').classList.remove('hidden');
}
function switchFloor(f,btn){
  document.querySelectorAll('.floor-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
}
const _origSP=window.showPopup;
window.showPopup=function(loc){
  _origSP(loc);
  const ex=document.getElementById('floor-map-btn');
  if(ex)ex.remove();
  if((loc.name||'').toLowerCase().includes('engineering')){
    const el=document.querySelector('.popup-actions');
    if(el){
      const b=document.createElement('button');
      b.id='floor-map-btn';b.className='btn-outline small';
      b.style.marginTop='6px';b.textContent='🗺️ Floor Map';
      b.onclick=openFloorMap;el.appendChild(b);
    }
  }
};
