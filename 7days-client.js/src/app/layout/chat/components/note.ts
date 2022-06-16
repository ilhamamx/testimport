import { Link } from "react-router-dom";
/***
 * 1. tambah untuk menampilkan last chat,
 *    get last message dari colaboration -> tampilkan last message di list chat
 * 2. tambah untuk count unread message,
 *    get count unread chat -> simpan di listHandleChat -> tampilkan last message di list chat
 * 3. tampbah get list message
 *    get list chat -> simpan di redux listmessage -> tampilkan di component chat inner
 * 4. perbaiki tampilan button 
 *    tambah list channel pengiriman pesan -> update list message redux -> simpan pesan ke firestore
 * 5. klik button listHandleChat
 *    tambah function on click button listHandleChat 
 *          -> update redux selected chat 
 *          -> tambah use effect redux list message di chat inner 
 *          -> tampilan chat inner
 *    berdasarkan selected chat
 *    (useeffect -> listMessage)
 * 6. Attach File, tambahkan untuk pengiriman file
 *    tambahkan tampilan insert file attachment -> save file to storage
 * 7. update tampilan pesan biar bisa di scroll
 * 8. tampilan pesan vidio, image, audio, doc 
 *
 * 
 * 
 * 
 * 1. tambah last message yg berisi isi pesannya aja di colaboration
 * 2. tambah last message type , */


/***
 * 1. send message ke firebase                            V
 * 2. tambah foto profile customer di bagian atas chat    V
 * 3. tambah centang 2 di pesan                           V
 * 4. tambah translate untuk waktu                        V
 * 5. button sampai bisa kirim channel ke function        V
 * 6. simpan data chat ke local storage                   V
 * 7. photo dan nomor hp di header chat                   V
 * 8. diff chat masih tidak sesuai                        V
 * 9. kirim ke server 7days react                         - 
 * 10. update bubble count unread message                 V
 * 11. button edit contact                                V
 * 12. bubble unread count side bar menu harus sama 
 *     jumlahnya dengan unread message                    V
 * 13. batasan pesan yg tampil (nantik dlu.. gajadi)      X 
 * 14. add new message (function)                         V 
 * 15. tambah save to local storage ketika simpan keredux V
 * 16.
 */

