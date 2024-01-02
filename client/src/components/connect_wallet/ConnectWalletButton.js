import "./connect.css";

const ConnectWalletButton = ({
    onPressLogout,
    onPressConnect,
    loading,
    address,
}) => {
    return (
        <div>
            {address && !loading ? (
                <button onClick={onPressLogout} className="connect-wallet">
                    Disconnect
                </button>
            ) : loading ? (
                <button
                    className="connect-wallet connect-button-loading"
                    disabled
                >
                    <div>Loading...</div>
                </button>
            ) : (
                <button onClick={onPressConnect} className="connect-wallet">
                    Connect Wallet
                </button>
            )}
        </div>
    );
};

export default ConnectWalletButton;