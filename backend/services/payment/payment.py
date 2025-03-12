from typing import List, Optional
from models.payment.payment import PaymentModel
from datetime import datetime
from bson import ObjectId

class PaymentService:
    def __init__(self, payment_collection):
        self.payment_collection = payment_collection

    def create_payment(self, payment: PaymentModel) -> PaymentModel:
        """
        Create a new payment record
        """
        payment_dict = payment.dict()
        result = self.payment_collection.insert_one(payment_dict)
        payment.p_id = str(result.inserted_id)
        return payment

    def get_payment_by_id(self, payment_id: str) -> Optional[PaymentModel]:
        """
        Retrieve a payment by its ID
        """
        payment = self.payment_collection.find_one({"_id": ObjectId(payment_id)})
        return PaymentModel(**payment) if payment else None

    def get_payments_by_payee(self, payee_id: str) -> List[PaymentModel]:
        """
        Retrieve all payments for a specific payee
        """
        payments = self.payment_collection.find({"p_payeeid": payee_id})
        return [PaymentModel(**payment) for payment in payments]

    def get_payments_by_receiver(self, receiver_id: str) -> List[PaymentModel]:
        """
        Retrieve all payments for a specific receiver
        """
        payments = self.payment_collection.find({"p_recieverid": receiver_id})
        return [PaymentModel(**payment) for payment in payments]

    def get_payments_by_user_id(self, user_id: str) -> List[PaymentModel]:
        """
        Retrieve all payments where user is either payee or receiver
        """
        payments = self.payment_collection.find({
            "$or": [
                {"p_payeeid": user_id},
                {"p_recieverid": user_id}
            ]
        })
        return [PaymentModel(**payment) for payment in payments]

    def get_all_payments(self) -> List[PaymentModel]:
        """
        Retrieve all payments
        """
        payments = self.payment_collection.find({})
        async def get_all_payments(self) -> List[PaymentModel]:
            """
            Retrieve all payments
            """
            payments = await self.payment_collection.find({}).to_list(None)
            return [PaymentModel(**payment) for payment in payments]