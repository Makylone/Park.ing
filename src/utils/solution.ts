/*

precious pseudo code of the old algorithm

multiplier = [1,5,10,15,20,25,27,29,31,33,35]
for (event_bonus = userMaxEvent_bonus; event_bonus >= 0; event_bonus -= 1)
  for (energy = 10; energy >= 0; energy -= 1)
    for (bracket = 0; bracket < 125; bracket++)

      → compute base_point from bracket
      base_point = 100 + bracket
      → compute event_point using base_point and event_bonus
      event_point = multiplier[energy] * floor(base_point*((event_bonus/100)+1))
      → compute num_games from points_needed and event_point
      num_games = ceil(points_needed/event_point)
      if num_games > 3
             next
      remaining_points = points_needed - (event_point*(num_games-1))
      → build Solution object and push to array
      Solution(i, num_games, energy, multiplier, event_bonus, event_point, bracket)
*/

/*
Solutions.sort((a,b) => {

  if a.event_bonus !== b.event_bonus:
    return b.event_bonus - a.event_bonus
  if a.number_of_game !== b.number_of_game:
    return a.number_of_game - b.number_of_game
  if a.cost_energy !== b.cost_energy:
    return a.cost_energy - b.cost_energy
  if a.range.min!==b.range.min:
     return a.range.min - b.range.min
  return 0
})
*/

/*
seen = Set()
filtered = []
for solution in Solutions
  key = solution.event_bonus + "-" + solution.num_games + "-" + solution.bracket
  if !seen.has(key)
    seen.add(key)
    filtered.push(solution)

*/
