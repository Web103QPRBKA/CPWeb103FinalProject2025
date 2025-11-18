import React from "react";
import "../css/Rules.css";

const Rules = () => {
  return (
    <div className="logic-guide">
      <h1>Welcome!</h1>
      <p>
        Here’s a concise guide to solving <strong>logic grid puzzles</strong>{" "}
        like those in Dell Logic Problems.
      </p>

      <section>
        <h2>How Logic Grid Puzzles Work</h2>
        <p>
          You’re given categories (Person, Pet, House color, etc.) and clues.
          Match one item from each category using pure deduction e.g. Each
          person will have exactly one pet and one house color.
        </p>
      </section>

      <section>
        <h2>Basic Rules</h2>
        <ul>
          <li>
            <strong>One-to-one matches:</strong> A confirmed match eliminates
            the rest of its row/column.
          </li>
          <li>
            <strong>Grid usage:</strong> ✓ = A definite match, x = A definite
            impossibility.
          </li>
          <li>
            <strong>Clue types:</strong> Direct → ✓, Negative → X, Ordering →
            restrict. There are several common clue types: Direct clues "Amy
            lives in the blue house." → Immediately place ✓ in that box and X in
            all other boxes in Amy’s house-row. Exclusive clues "The person with
            the parrot doesn’t live in the green house." → Place an X at
            (Parrot, Green). Indirect/inference clues "Dan lives next to the
            person who owns the fish." → This creates a relationship you must
            enforce across possibilities, not immediate ✓ or X. Sequencing or
            ordering clues “The red house is to the left of the yellow house.” →
            Restricts positions but does not identify the exact positions
            immediately. Either/or clues “Carla owns either the dog or the
            parrot.” → Mark other pets with X; keep both possibilities open
            until more clues resolve it.
          </li>
          <li>
            <strong>Cross-eliminate:</strong> Every ✓ forces x’s elsewhere.
          </li>
          <li>No guessing—logic only.</li>
        </ul>
      </section>

      <section>
        <h2>Tips</h2>
        <ul>
          <li>Start with the strongest clues.</li>
          <li>Break multi-part clues into simple steps.</li>
          <li>Use mini diagrams for “left of” or “between.”</li>
          <li>Re-check clues after each deduction.</li>
          <li>Watch for rows/columns with one remaining option.</li>
        </ul>
      </section>
    </div>
  );
};

export default Rules;
