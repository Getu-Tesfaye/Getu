class Bankconfig:
    _instance = None  # stores single instance

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        cls._instance.bank_name = "commercial bank of Ethiopia"
        cls._instance.interest_rate = 0.05
        cls._instance.overdraft_limit = 500
        cls._instance.daily_max_withdrawal = 50000
        return cls._instance

    def update_settings(self, new_rate=None, new_overdraft=None):
        if new_rate is not None:
            self.interest_rate = new_rate
        if new_overdraft is not None:
            self.overdraft_limit = new_overdraft

    def display_config(self):
        print(f"\n  {self.bank_name}")
        print(f"interest rate: {self.interest_rate}")
        print(f"overdraft limit: {self.overdraft_limit}")
        print(f" daily max  withdrawal: {self.daily_max_withdrawal}")


if __name__ == "__main__":
    config = Bankconfig()
    config.display_config()


    

   



