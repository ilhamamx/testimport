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

/***
 * Document Message Chat                                              - (last chat masih nggak keload)
 * 1. Refactor Process Message                                        -
 * 2. Process Upload file Document ke firestore storage               -
 * 3. Change message model biar bisa nerima dan ngirim tipe dokumen   -
 * 4. Tampilan Untuk pesan Document incoming/outgoing                 -
 * 5. kirim pesan ke server side                                      -
 * 5. send new messages change chat position on bottom                -
 * 6. Bubble sidebar mobile view
 */ 

/**
 * Image & Video Message Chat
 * 1. Outgoing/incoming image message type
 * 2. Outgoing/incoming video message type
 * 3. chat ui vidio & image 
 * 4. Video & Image preview
 * 5. send to server side video or image
 * 6. last sent vidio or image file
 * 7. update collaboration on firebase 
 * 8. update collaboration on local (lastInteractionMessage, lastInteractionChannel, lastInteractionAt,lastInteractionType)
 * 9. maximal bubble chat need to check in mobile view
 */

/***
 * NOTE BUG
 * 1. pesan hilang ketika di reload - Bug last sent messages              
 * 2. list message - update last message                                      
 * 3. batasan type file
 * 5. siapin file document untuk di test (pdf, excel, word, txt, ods, dll)    
 * 6. siapin file image untuk di test (jpg, png, jpeg, bitmap, gif, dll)   
 * 7. siapin file video untuk di test (mp4, 3gp, mov)   
 * 8. check maximmum size file
 * 9. chatlist tidak urut
 */


/**
 * Translate
 * 1. Failed to download file (ChatMessage doc, ChatFileView)
 */