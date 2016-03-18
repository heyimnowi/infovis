$( document ).ready(function() {
  var dataset = [["compact",1],["graphical",5],["presentation",1],["and",24],["user",2],["interface",1],["for",11],["manipulating",1],["large",3],["numbers",1],["of",49],["items",3],["possibly",1],["extracted",1],["from",2],["far",1],["larger",1],["datasets",2],["enables",1],["users",2],["to",30],["make",2],["discoveries",1],["decisions",1],["or",8],["explanations",1],["about",1],["patterns",2],["trend",1],["cluster",1],["gap",1],["outlier",1],["groups",1],["individual",2],["the",38],["use",5],["computersupported",1],["interactive",4],["visual",9],["representations",6],["abstract",8],["data",30],["amplify",4],["cognition",5],["information",27],["visualization",27],["utilizes",1],["computer",7],["graphics",4],["interaction",4],["assist",1],["humans",1],["in",24],["solving",1],["problems",1],["is",21],["a",23],["set",1],["technologies",1],["that",4],["computing",1],["human",3],["with",6],["promises",1],["help",1],["us",1],["speed",1],["our",1],["understanding",2],["action",1],["world",1],["increasing",1],["volumes",1],["purpose",1],["cognitive",2],["performance",1],["not",3],["just",2],["create",2],["interesting",1],["pictures",1],["visualizations",3],["should",2],["do",2],["mind",1],["what",2],["automobiles",1],["feet",1],["attempt",1],["efficiently",1],["map",2],["variables",2],["onto",1],["dimensions",2],["order",1],["graphic",1],["an",5],["increasingly",1],["important",4],["subdiscipline",1],["within",1],["hci",1],["focuses",2],["on",5],["mechanisms",1],["designed",1],["show",2],["structure",2],["improve",1],["cost",1],["access",1],["repositories",1],["printed",1],["form",2],["has",5],["included",1],["display",2],["numerical",1],["eg",6],["bar",1],["charts",3],["plot",1],["pie",1],["combinatorial",1],["relations",2],["drawings",1],["graphs",1],["geographic",2],["encoded",1],["maps",1],["computerbased",1],["systems",1],["such",3],["as",7],["visualizer",1],["dynamic",1],["queries",1],["have",1],["added",1],["interactivity",2],["new",2],["techniques",4],["3d",2],["animation",2],["semantics",1],["meaning",1],["contrast",2],["scientific",3],["typically",2],["deals",2],["nonnumeric",1],["nonspatial",1],["highdimensional",1],["method",1],["presenting",1],["nontraditional",1],["forms",2],["by",2],["using",2],["2d",1],["color",2],["these",1],["can",5],["allow",1],["one",2],["navigate",1],["through",1],["it",8],["modify",2],["interactions",1],["subject",1],["science",3],["sensory",2],["reinforce",1],["complex",1],["research",1],["area",1],["builds",1],["theory",1],["design",1],["humancomputer",1],["practical",1],["application",1],["programs",1],["involves",1],["selecting",1],["transforming",1],["representing",1],["facilitates",1],["exploration",1],["aspects",1],["are",11],["dynamics",1],["representation",1],["strong",1],["enable",1],["realtime",1],["thus",1],["affording",1],["unparalleled",1],["perception",1],["structural",1],["question",1],["although",1],["much",2],["work",2],["regards",1],["auditory",1],["other",2],["also",2],["concern",1],["study",1],["how",2],["effectively",1],["present",1],["visually",1],["this",8],["field",1],["creating",1],["innovative",1],["displays",1],["complicated",1],["census",1],["results",2],["databases",1],["example",1],["problem",1],["would",1],["be",5],["deciding",1],["pages",1],["website",1],["files",1],["hard",1],["disk",1],["include",1],["selective",1],["hiding",1],["layering",1],["taking",2],["advantage",2],["3dimensional",1],["space",7],["scaling",1],["provide",1],["more",2],["fisheye",1],["views",1],["psychological",1],["principles",1],["layout",1],["proximity",1],["alignment",1],["shared",1],["properties",1],["sometimes",3],["called",4],["infovis",1],["special",1],["kind",3],["part",1],["which",3],["turn",1],["subset",1],["defined",2],["follows",1],["card",3],["et",3],["al",3],["1998",3],["means",1],["transformed",1],["into",2],["image",3],["mapped",2],["screen",3],["changed",1],["they",2],["proceed",1],["working",1],["allows",1],["constant",1],["redefinition",1],["goals",1],["when",1],["insight",1],["been",1],["gained",1],["makes",3],["external",2],["resources",1],["used",2],["thinking",1],["people",1],["relieved",1],["having",1],["imagine",1],["everything",1],["instead",1],["look",1],["at",1],["only",2],["possible",1],["because",1],["vision",1],["very",1],["bandwidth",1],["largest",1],["all",1],["senses",1],["no",1],["inherent",1],["mapping",1],["examples",3],["survey",1],["database",1],["staff",1],["company",1],["containing",1],["names",1],["addresses",1],["salary",1],["attributes",1],["seen",1],["physicallybased",1],["reference",1],["coordinates",3],["relatively",1],["easy",1],["visualize",1],["intuitive",1],["way",2],["dataset",1],["tomography",1],["body",1],["straightforward",1],["find",1],["good",1],["values",1],["difference",1],["whether",1],["structured",2],["unstructured",3],["networks",1],["software",1],["algorithms",1],["does",1],["play",1],["role",1],["thesis",1],["here",1],["collection",1],["records",4],["number",1],["different",2],["criteria",4],["each",2],["record",1],["instance",1],["fish",2],["fishcatch",1],["following",1],["recorded",1],["species",1],["weight",1],["sex",1],["measurements",1],["length",1],["",2],["arranged",1],["rows",1],["up",1],["columns",1],["table",1],["observations",1]];

  var colors = ["#EFD510", "#2C2D34", "#F2910A", "#E94822"];

  var b = d3.scale.linear()
                  .domain([1, 50])
                  .range([15, 30]);

  d3.select("#container")
    .selectAll("p")
    .data(dataset)
    .enter()
    .append("p")
    .text(function(d) { return d[0]; })
    .style("font-size", function(d) { return b(d[1]) +"px"; })
    .style("color", function(d) { return colors[d[1]%4]});
});


