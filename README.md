# Overview
The 2014 FIFA World Cup Team Challenge was a four-man competition based around the 2014 World Cup in Brazil.

The application is written using [AngularJS](https://angularjs.org/), with [Bootstrap](http://getbootstrap.com/) to assist with the UI (In particular, the responsive nature of the site.)  This was written primarily for mobile phones, though viewing on a desktop worked well enough (My UI skills are limited, so that was the best I could do for the time being.)

The application utilizes two data sources: [Kimono Labs' World Cup APIs](http://www.kimonolabs.com/worldcup/explorer) and custom services running on Microsoft Azure.  Kimono gives the team, match, and player info, while info about each team owner (as well as extra info, such as team elimination) comes from Azure Mobile Services.

UPDATE (2018.08.09): Given that Kimono Labs is now defunct, this application will no longer work.

## Kimono APIs

* [Teams (contains team info, including results, group info, and totals)](http://worldcup.kimonolabs.com/api/teams?apikey=22d3649db54ee3dbcd7c3e5f8e001010&sort=name&fields=name,logo,group,groupRank,groupPoints,matchesPlayed,wins,losses,draws,goalsFor,goalsAgainst,goalsDiff,id,type)

* [Matches (Contains each match of the cup, the score and when matches were occurring, the current game time)](http://worldcup.kimonolabs.com/api/matches?apikey=22d3649db54ee3dbcd7c3e5f8e001010&sort=startTime&fields=homeScore,awayScore,homePenalties,awayPenalties,currentGameMinute,startTime,status,group,awayTeamId,homeTeamId,id)

* [Players (Used for goal/assist leaders)](http://worldcup.kimonolabs.com/api/players?apikey=22d3649db54ee3dbcd7c3e5f8e001010&limit=10&fields=firstName,lastName,teamId,goals,assists)
