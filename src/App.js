import configureStore from './store/config/configureStore.js'
import React from 'react';
// import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter.js';


const store = configureStore();
store.subscribe(()=>{
  console.log(store.getState());
});

function App() {
  return (
    <AppRouter articles={posts}/>
  );
}

export default App;



const posts = [
  {
    url: 'https://www.espn.com/fantasy/football/story/_/id/29931541/fantasy-football-highs-lows-nfl-week-2-saquon-barkley-many-notables-go-down',
    up_votes: 0,
    down_votes: 0,
    reports: 0,
    title: 'Fantasy football highs and lows from NFL Week 2: Saquon Barkley among many notables to go down',
    posted_date: '09/01/2020',
  },{
    url: 'https://www.pff.com/news/fantasy-football-reactions-to-nfl-week-2',
    up_votes: 0,
    down_votes: 0,
    reports: 0,
    title: 'Jahnke: Fantasy football reactions to NFL Week 2',
    posted_date: '09/01/2020',
  },{
    url: 'https://sports.yahoo.com/cowboys-did-something-no-team-has-done-in-87-years-it-occurred-in-a-win-that-rarely-materialized-under-jason-garrett-023704750.html',
    up_votes: 0,
    down_votes: 0,
    reports: 0,
    title: 'Cowboys did something no team has done in 87 years. It occurred in a win that rarely materialized under Jason Garrett.',
    posted_date: '09/01/2020',
  },{
    url: 'https://www.nytimes.com/2020/09/21/sports/football/las-vegas-raiders-stadium.html',
    up_votes: 0,
    down_votes: 0,
    reports: 0,
    title: 'The N.F.L., After Shunning Las Vegas, Doubles Down With Raiders',
    posted_date: '09/01/2020',
  },{
    url: 'https://www.wsj.com/articles/nfls-first-week-draws-fewer-viewers-amid-sports-bonanza-11600212261?mod=searchresults&page=1&pos=3',
    up_votes: 0,
    down_votes: 0,
    reports: 0,
    title: 'NFL’s First Week Draws Fewer Viewers Amid Sports Bonanza',
    posted_date: '09/01/2020',
  },
]