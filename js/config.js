angular.module('fifaWC.config', []).constant(
    'kimonoConfig',
    {
        kimonoTeamsURL: "http://worldcup.kimonolabs.com/api/teams?apikey=bc6d6fac9954d187d0706e4f9aeb26c6&sort=name&fields=name,logo,group,groupRank,groupPoints,matchesPlayed,wins,losses,draws,goalsFor,goalsAgainst,goalsDiff,id,type",
        kimonoMatchesURL: "http://worldcup.kimonolabs.com/api/matches?apikey=bc6d6fac9954d187d0706e4f9aeb26c6&sort=startTime&fields=homeScore,awayScore,currentGameMinute,startTime,status,group,awayTeamId,homeTeamId,id"
    }
);