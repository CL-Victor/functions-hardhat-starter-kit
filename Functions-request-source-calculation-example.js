// This example shows how to share Fortine leaderboard top 10 for a specific season specifide in the contract args
// This leaderboard could trigger on-chain rewards transfers to the winners in the form of NFTs (unique tradeable in-game skins) or cryptocurrency payments

// Arguments can be provided when a request is initated on-chain and used in the request source code as shown below
const fortnite_season = args[0]
let leaderboard = "";
const fortniteLeaderboard = await Functions.makeHttpRequest({
  url: `https://www.epicgames.com/fortnite/competitive/api/leaderboard/floating/Hype_${fortnite_season}/undefined`
});

if (!fortniteLeaderboard.error) {
  for (let i = 0; i < 10; i++) {
      if (i == 9) {
        leaderboard += `${fortniteLeaderboard.data.entries[i].rank}-${fortniteLeaderboard.data.entries[i].players[0].displayName}`;
      } else {
        leaderboard += `${fortniteLeaderboard.data.entries[i].rank}-${fortniteLeaderboard.data.entries[i].players[0].displayName},`;
      }
    }
    console.log(`The Top 10 Leaderboard of Fortnite S22 is: ${leaderboard}`);
    return Functions.encodeString(leaderboard);
} else {
  throw Error("Fortnite Leaderboard API request failed: " + fortniteLeaderboard.message);
}