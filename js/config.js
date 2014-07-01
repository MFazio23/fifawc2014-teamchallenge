angular.module('fifaWC.config', [])
    .config(['localStorageServiceProvider', function(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix("fifaWC");
    }])
    .constant(
    'URLs',
    {
        fifaFlagURL: "http://img.fifa.com/images/flags/4/{shortName}.png",
        wikiSearchURL: "http://en.wikipedia.org/w/index.php?search={searchTerm}&title=Special%3ASearch&go=Go"
    })
    .constant(
    'kimonoConfig',
    {
        kimonoTeamsURL: "http://worldcup.kimonolabs.com/api/teams?apikey=22d3649db54ee3dbcd7c3e5f8e001010&sort=name&fields=name,logo,group,groupRank,groupPoints,matchesPlayed,wins,losses,draws,goalsFor,goalsAgainst,goalsDiff,id,type",
        kimonoMatchesURL: "http://worldcup.kimonolabs.com/api/matches?apikey=22d3649db54ee3dbcd7c3e5f8e001010&sort=startTime&fields=homeScore,awayScore,homePenalties,awayPenalties,currentGameMinute,startTime,status,group,awayTeamId,homeTeamId,id",
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