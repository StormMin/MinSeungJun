const quotes=[
    {
    quote:"삶이 있는 한 희망은 있다",
    author:"kikero",
},  
{
    quote:"내 뒤에 공은 없다",
    author:"김병지",
},  
{
    quote:"먼저핀꽃은 먼저진다  남보다 먼저 공을 세우려고 조급히 서둘것이 아니다",
    author:"채근담",
}, 
 {
    quote:"만약 우리가 할 수 있는 일을 모두 한다면 우리들은 우리자신에 깜짝 놀랄 것이다",
    author:"에디슨",
},  
{
    quote:"돈이란 바닷물과도 같다. 그것은 마시면 마실수록 목이 말라진다. ",
    author: "쇼펜하우어"
},
{
    quote:"피할수 없으면 즐겨라",
    author:"로버트 엘리엇"
},
{
    quote:"평생 살 것처럼 꿈을 꾸어라.그리고 내일 죽을 것처럼 오늘을 살아라.",
    author:"제임스 딘"
},
{
    quote:"불편해? 자세를 고쳐앉아",
    author: "김찬호"
},
{
    quote:"만족할 줄 아는 사람은 진정한 부자이고,탐욕스러운 사람은 진실로 가난한 사람이다"
    ,author:"솔론",
},
{
    quote:"희망은 사람을 성공으로 인도하는 신앙이다.",
    author:"헬렌켈러",
},
]
const quote=document.querySelector("#quote span:first-child");
const author=document.querySelector("#quote span:last-child");
const todaysQuotes=quotes[Math.floor(Math.random() * quotes.length)];
 quote.innerText=todaysQuotes.quote;
 author.innerText=todaysQuotes.author;