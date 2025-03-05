import java.util.ArrayList;
import java.util.List;
public class AccountManager {
    private List<Account> accounts;
    public AccountManager() {
        accounts = new ArrayList<>();

        accounts.add(new Account("0001","770609",10000));
        accounts.add(new Account("0002","050422",5000));
    }

    @param cardNumber
    @return
    public Account findAccount(String cardNumber) {
        for (Account account : accounts) {
            if (account.getCardNumber().equals(cardNumber)) {
                return account;
            }
        }
        return null;
    }
    @param fromAccount
    @param toCardNumber
    @param amount
    @return

    public boolean transfer(Account fromAccount, String toCardNumber, double amount) {
        if (amount <= 0 || amount > fromAccount.getBalance()) {
            return false;
        }
        Account toAccount = findAccount(toCardNumber);
        if (toAccount == null || fromAccount.getCardNumber().equals(toCardNumber)) {
            return false;
        }
        fromAccount.setBalance(fromAccount.getBalance() - amount);
        toAccount.setBalance(toAccount.getBalance() + amount);
        return true;
    }
    @return
        public List<Account> getAllAccounts() {
            return new ArrayList<>(accounts);
    }
    @param account
    @return

    public boolean addAccount(Account account) {
        if (findAccount(account.getCardNumber()) != null) {
            return false;
    }
        accounts.add(account);
        return true;
    }
}
