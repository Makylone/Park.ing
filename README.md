# ProSeka Event Point Calculator (Park.ing)

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

In Project Sekai events, "parking" means stopping at an exact point total, typically to land on a ranking tier boundary or to include reference in it. This usually matters in the last ~100,000 points.

The calculator assumes you're playing **Hitorinbo Envy on any difficulty** (as long as you can reach the score range required) and generates a step-by-step game plan to hit your target exactly. Each step tells you what energy level and score bracket to aim for on that play.

## How the math works

The calculator uses a formula (shared by @./maaya_ou on Discord) to compute event points based on three inputs: your live score, your event bonus, and your energy usage (which maps to a specific multiplier).

The formula looks like this:

$$\text{Event Point} = \text{Multiplier} \times \left\lfloor (1 + \text{Event Bonus}) \times \left(100 + \left\lfloor \frac{\text{Live Score}}{20000} \right\rfloor \right) \right\rfloor$$

The ⌊ ⌋ symbols mean "floor", round down to the nearest whole number. So a live score of 45,000 gives ⌊45,000 / 20,000⌋ = ⌊2.25⌋ = 2.

### The old approach (brute force)

The previous version of the calculator generated every possible combination from top to bottom: starting with the highest event bonus, then the fewest games, then the lowest live score. If no single-game solution existed, it would add one more game and repeat the search until it found a valid result.

This meant that most of the time, parking required no changes to the player's current event team, since it's simpler to park without tweaking the team composition.

### The new approach (dynamic programming)

The current calculator uses dynamic programming to find the fewest games needed to reach the exact target.

Here's how it works step by step:

1. **Build a table of all achievable event point values.** For a given event bonus, the calculator computes every possible event point value across all score brackets (the range your live score falls into) and energy levels. Each unique value becomes a "coin" we can use.

2. **Find the shortest combination that adds up to the target.** This is the same idea as the classic [coin change problem](https://en.wikipedia.org/wiki/Change-making_problem). Imagine you have coins worth 1, 2, and 5. To make exactly 10, the shortest way is 5 + 5 (two coins), even though you could also use 2 + 2 + 2 + 2 + 2 (five coins) or ten 1s. The calculator does exactly this, but instead of coin values, it uses event point values, and instead of coins, it picks games with specific energy and score settings.

3. **Reconstruct the game plan.** Once the shortest combination is found, the calculator traces back through its choices to build the full sequence: which energy level and score bracket to aim for on each game.

The result is a game-by-game plan where every play might have different settings, but the total adds up to your target with zero overshoot.

## Limitations

- **Score range may exceed your team's ability.** Since the calculator has no input for your team's talent, it might suggest a score bracket your team can't reach. For now, the calculator is capped at a 2,000,000 live score, so it won't ask for anything above that, but it could still suggest ranges that are difficult for lower-power teams.

- **Large point gaps may freeze the browser.** The algorithm builds an array as large as the point gap and loops over every game option for each entry. For small gaps (under ~10,000), this is instant. For larger gaps (50,000+), the computation can take several seconds, and since it runs on the main thread, the page will be unresponsive until it finishes. There's currently no loading indicator or way to cancel.

## Roadmap

#### v1 — Core
- [x] Event point formula implementation
- [x] Top 3 solutions display
- [x] GitHub Pages deployment

#### v2 — Update the algorithm
- [x] Update the algorithm, to get the shortest amount of games
- [ ] Move computation to a web worker to prevent the UI from freezing on large point gaps
- [ ] Add an input to enter the max possibe live score 
- [ ] Add a form to enter the talent team and ISV

#### v3 — Polish
- [ ] Mobile-optimized layout
- [ ] Add support for other songs (Melt, HCM, Sage, LnF, ect...)

## Credits

- Maaya for the formula (@./maaya_ou)
- [Parking Spreadsheet](https://docs.google.com/spreadsheets/d/19KDNlfzjaOvS96kKe87xAfp2Rn5BHHpjVuVC9JqWbug) from Ai0
- [えび japanesse sheet](https://docs.google.com/spreadsheets/d/1om--O7_NqvvQ6TDg1jrsjKMVBR_s1j1o)

## License

MIT
