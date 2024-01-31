/**
 * assetAddress - контракт токена
 * assetId - токен ид
 * paymentTokenAmount - сумма в токене покупки
 */

class ElementServiceInterface {
    makeBuyOrder(assetAddress, paymentTokenAmount) {
        throw new Error("This method must be implemented");
    }

    cancelOrder() {
        throw new Error("This method must be implemented");
    }

    makeSellOrder(assetAddress, assetId, paymentTokenAmount) {
        throw new Error("This method must be implemented");
    }
}

export default ElementServiceInterface;