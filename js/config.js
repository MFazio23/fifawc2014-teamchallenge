angular.module('fifaWC.config', [])
    .constant(
    'kimonoConfig',
    {
        kimonoTeamsURL: "http://worldcup.kimonolabs.com/api/teams?apikey=22d3649db54ee3dbcd7c3e5f8e001010&sort=name&fields=name,logo,group,groupRank,groupPoints,matchesPlayed,wins,losses,draws,goalsFor,goalsAgainst,goalsDiff,id,type",
        kimonoMatchesURL: "http://worldcup.kimonolabs.com/api/matches?apikey=22d3649db54ee3dbcd7c3e5f8e001010&sort=startTime&fields=homeScore,awayScore,currentGameMinute,startTime,status,group,awayTeamId,homeTeamId,id",
        kimonoPlayersURL: "http://worldcup.kimonolabs.com/api/players?apikey=22d3649db54ee3dbcd7c3e5f8e001010&limit=10&fields=firstName,lastName,teamId,goals,assists&sort={0}"
    })
    .constant(
    'ownerMapping',
    {
        "Emad Kazmi": "Emad",
        "Michael Fazio": "Fazio",
        "Sergio Piraino": "Sergio",
        "Murphy McGraw": "Murphy"
    });