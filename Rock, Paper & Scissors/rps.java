import java.util.*;

public class rps {

    private static final String[] MOVES = {"rock", "paper", "scissors"};
    private static final Map<String, String> WIN_MAP = Map.of(
        "rock", "scissors",
        "paper", "rock",
        "scissors", "paper"
    );

    private static final List<String> userHistory = new ArrayList<>();
    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        System.out.println("Welcome to AI Rock-Paper-Scissors!");
        System.out.println("Type 'rock', 'paper', or 'scissors'. Type 'exit' to quit.");

        while (true) {
            System.out.print("Your move: ");
            String userMove = scanner.nextLine().trim().toLowerCase();

            if (userMove.equals("exit")) {
                System.out.println("Thanks for playing!");
                break;
            }

            if (!Arrays.asList(MOVES).contains(userMove)) {
                System.out.println("Invalid move. Try again.");
                continue;
            }

            String aiMove = getAIMove();
            System.out.println("AI chose: " + aiMove);
            String result = decideWinner(userMove, aiMove);
            System.out.println(result);
            System.out.println("--------------");

            userHistory.add(userMove);
        }
    }

    private static String getAIMove() {
        if (userHistory.isEmpty()) {
            return MOVES[new Random().nextInt(MOVES.length)];
        }

        // Count how often the user chose each move
        Map<String, Integer> freq = new HashMap<>();
        for (String move : MOVES) {
            freq.put(move, Collections.frequency(userHistory, move));
        }

        // Predict user's next move based on frequency
        String predicted = Collections.max(freq.entrySet(), Map.Entry.comparingByValue()).getKey();

        // AI plays the move that beats the predicted move
        for (String move : MOVES) {
            if (WIN_MAP.get(move).equals(predicted)) {
                return move;
            }
        }

        return MOVES[new Random().nextInt(MOVES.length)]; // Fallback
    }

    private static String decideWinner(String user, String ai) {
        if (user.equals(ai)) return "It's a draw!";
        if (WIN_MAP.get(user).equals(ai)) return "You win!";
        return "AI wins!";
    }
}
