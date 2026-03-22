# ProSeka Event Point Calculator

A tool for Project Sekai players to plan their final push during events. Given your current points, target points, and maximum event bonus, the calculator returns the best team setups to reach your goal, showing the number of games needed, energy usage, score range, and event points per game.

## Why

All the existant solution are incomplet.
Realistically, you have 3 solutions:

1. Use the Ai0 sheet, which only works when you are very close to your park, because it only works on x0. 
2. Use the japanesse sheet (えび), that is akward to use and not very beginner friendly, and only works for x0.
3. Crying. And ask your managers to help you for your park. 

I have done all three solutions and, although Ai0 sheet is well done in some aspect (especially for calculing the maximum live score possible with your talent team), we can improve it.

This is why I have created this calculator, that automatically tells you what to do, how much games you should play, with what energy usage and what event bonus team (most of the time, it tries to be as close to your maximum event bonus team).

## How it works

The calculator assumes you're playing **Hitorinbo Envy on any difficulty** (as long as you are able to reach the range of score required) and focuses on the park (that is typically in the last ~100,000 points). It generates all possible combinations of energy usage, event bonus, and score brackets, then returns the top 3 solutions sorted by:

1. Highest event bonus
2. Fewest games
3. Lowest live score 

When the final game would overshoot, the calculator also suggests adjusted settings (lower energy and/or score bracket) for that last play.

## What the math behind

The calculator uses the formula (taken from @./maaya_ou on discord) to calculate the event point, base on the live score, event bonus and the energy usage (that correspond to a certain multiplier).
The formula looks like this:

$$\text{Event Point} = \text{Multiplier} \times \left\lfloor (1 + \text{Event Bonus}) \times \left(100 + \left\lfloor \frac{\text{Live Score}}{20000} \right\rfloor \right) \right\rfloor$$

The calulator will generate all the solution from top to bottom, starting with the highest event bonus possible, then fewest games and after that lowest live score.
If there is no solution in one game, the calculator will add +1 to the step and redo the same thing again, until it found a solution.
It means that most of the time, the park would require no change on the current event team, as it is simplier to park without tweaking the event team.

## Limitation of this calculator

Although this seems perfect, it is far from that for multiple reasons:

- Because I decided to not make any changes on the setup, sometimes the calculator might just asks you to do 50,100 or 200 games, which too much obviously. If that's the case, try to get a bit closer to your park by playing **Hitorinbo Envy with 0 energy usage in easy difficulty**.
- Since there is no forms to input your maximum talent, the calculator might asking you to do impossible bracket score for your event team. For now, the calculator is capped at 2mil live score, meaning it wont ask you to do more than 2mil live score to park.

## Roadmap

#### v1 — Core
- [x] Event point formula implementation
- [x] Top 3 solutions display
- [x] GitHub Pages deployment

#### v2 — Update the algorithm
- [ ] Fix the algorithm for odds numbers
- [ ] Add an input to enter the max possibe live score 
- [ ] Add a form to enter the talent team and ISV

#### v3 — Polish
- [ ] Mobile-optimized layout
- [ ] Add support for other songs (Melt, HCM, Sage, LnF, ect...)

## Credits

- Maaya (@./maaya_ou)
- [Parking Spreadsheet](https://docs.google.com/spreadsheets/d/19KDNlfzjaOvS96kKe87xAfp2Rn5BHHpjVuVC9JqWbug) from Ai0 

## License

MIT
