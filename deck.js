const ranks = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Jack', 'Queen', 'King'];
const suites = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const deck = ranks.reduce((cards, rank) => {
    suites.forEach(suite => {
        const card = `${rank} of ${suite}`;
        cards = [..]
    })
    [...cards, `${rank} of `]
}, [])