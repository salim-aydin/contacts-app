
1-src nın altına compenents isminde bir dosya ve içine de Contacts adında bir dosya daha açılır
2-Contacts ın altına da index.js adında bir dosya açılır,contacts compenent imizi çağırdığımızda kullanacağımız dosyamız
3-App js içerisinde contacts'ın içindeki index.js dosyamızı çağırırız
4-components ın altında List adında dosya açarız ve içine index.js adında bir dosya daha açarız
5-contacts compenentının index.js ine gireriz ve , list in içindeki index.js dosyasını çağırırız
6-compenets ın altında Form adında bir dosya açarız ve içine index.js adında bir dosya daha açarız
7-contacts compenentının index.js ine gireriz ve , form un içindeki index.js dosyasını çağırırız

Şuana kadar genel olarak
1-contacts ın içindeki index.js dosyasını, app.js in içinde açtık
2-ve contacts ın içindeki index.js dosyasına, form ve liste klasoründeki index.js dosyasını çektik

--------------------------------------------------------------------------------------------------------------------------
Form compenentının içine gireriz ve 2 tane input yazarız ve 1 tane de buton ekleriz
Biz butona tıkladığımız anda 1 tane event i tetiklememiz lazım,sonuçta kayıt ekleyeceğiz bir yerlere,ve inputlara veri girildiği anda bunları state imize yazmamız lazım
Form compomentına form,setForm şeklinde bir useState ekleriz
const [form,setForm] = useState({fullname:'',phoneNumber:''})

Form componentına , bir input un içeriğinin değiştiği anda state ataması için 1 fonksiyon yazarız, onChangeInput adında bir fonksiyon oluştururz
const onChangeInput = (e) => {
    setForm({...form,[e.target.name]:e.target.value})
}

Daha sonrada input un Onchange değerine onChangeInput ifadesi verilir---<input onChange={onChangeInput}>

Şu andan itibaren inputa değerler girilebilir
-------------------------------------------------------------------------------------------------------------------------------
YİNE FORM A YAZMAYA DEVAM EDİYORUZ
Butona bastığımız anda ne olacağını belirlemek için fonksiyon yazarız
const onSubmit = () => {
    console.log(form)
}
Butona onClick özelliğinde onSubmit çalışsın --- <button onClick={onSubmit}>add</button>
veya
---------------------------------------------------------------------------------------------------------------------------------
Ana div in ismini form yaparız
button daki onClick i sileriz
form a onSubmit özelliğinde onSubmit in çalışması sağlanır--- <form onSubmit={onSubmit}>
GÖNDERDİĞİMİZ ANDA SAYFA OTOMATİK YENİLENİR, FORMUN VARSAYILAN DAVRANIŞINI DEĞİŞTİRMEK İÇİN , e.preventDefault() kullanılır
const onSubmit = (e) => {
    e.preventDefault()
    console.log(form)
}
----------------------------------------------------------------------------------------------------------------------------------
onSubmit işlemi yapıldığında eğer formun içindeki inputlar geçersizse , bunu durdurabiliriz
  const onSubmit = (e) => {
    e.preventDefault()
    if(form.fullname === '' || form.phone_number===''){
        return false;
    }
    console.log(form)
}
yani formu gönderme diyebiliriz, false olduğu için console.log(form) işlemi çalışmıyor
-----------------------------------------------------------------------------------------------------------------------------------
Bundan sonra yapmamız gereken,
buradaki kayıtları , bir state'e eklemek gerekiyor,ki List Compenent'ında onları listeliyebilelim
Ben eğer kullanıcı kayıtlarını , bu Form componenti içindeki bir state te tutarsam,bu state'i List compenent'ına nasıl taşıyacağım?
----------------------------------------------------------------------------------------------------------------------------------
Biz o state'i yani kullanıcıların ekleneceği state'i , eğer Context compenentında tutarsak,
ve bu state'e ekleme yapılacak olan,set işlemi yapacak olan fonksiyonu, eğer Context compenent'ın daki <Form/> a geçersem , problem kalmayacak
-------------------------------------------------------------------------------------------------
Ne demek bu
--------------------------------------------------------------------------------------------------
Context compenentında useState ı kullanarak bir state oluşturacağız,
yani kayıtlarımızın ekleneceği state, burada duracak
  const [contacts,setContacts] = useState([])  birden fazla elemanı burada tutmak istediğimiz için array olacak
  buradaki setContacts i , context compenentın içindeki <Form addContacts={setContacts}/> buraya göndeririz
  ----------------------------------------------------------------------------------------------
  Daha sonra form compenentına gidip
  function Form({addContact}) yazılır, yani , context compenentındaki form'a verdiğimiz prop u, form compenentında, fonksiyona, obje olarak gireriz
  girdikten sonra console.log(addContact) yazıp loglarsak,o atama işlemini yapacak olan fonksıyon konsola gelir
  -----------------------------------------------------------------------------------------------
  const onSubmit = (e) => {
    e.preventDefault()
    if(form.fullname === '' || form.phone_number===''){
        return false;
    }
    console.log(form)
}
    addContact([])
    
    O zaman ben artık , form onSubmit olduğunda, addContact'i kullanarak atama işlemi yapabilirim,
    Bu contact'in veri tipi arraydi, bizde addContact in içine array gireriz,
    benim form'um bir obje doğrudan buraya objeyi yerleştirebilirim
    addContact([form])
    ---------------------------------------------------------------------------------------------------
    daha sonra Contacts compenentına gidilir
    useEffect'i kullanarak bu context'e bir atama yapıldığında , son güncel halini görmeye çalışayim
    Hani biz form compenent'inde form submit edildiğinde bir ekleme işlemi yapıyoruz ya ---console.log(form) }addContact([form])--- 
    bu ekleme işlemi yapıldıktan sonra, ben elimdeki bu array'in son halinin ne olduğunu görmek istiyorum
    useEffect(()=> {
    console.log(contacts)
  },[contacts])

    Buradaki kod, contacts değiştiği anda burayı loglasın demek
    ------------------------------------------------------------------------------------------------------
    Burada form compenentın addContact([form])'ı düzeltiriz ve kayıtlı tutmak için bir kaç işlem daha yaparız bu işlemler
-----------------------------------------------------------------------------------------------------------
    Neden bir tane var?
    addContact işlemini yaptığımızda , hani array'e tek bir obje ataması yapıyoruz ya ---addContact([form])--- önceki verileri korumadığımız için
    onlar gitmiş oluyor,
    dolayısıyla ben burada eğer,
    elimdeki hali hazırda var olan contacts leri de gönderirsem
    **************
    Contacts compenentına girilir ve  <Form addContact={setContacts} contacts={contacts}/> ,, contacts={contacts} yazılır
    ve array ' e eski verileri koruyarak atama yaparsak problem çözülecektir
    function Form({addContact,contacts})
    addContact([...contacts,form])
    yaparsak sorun çözülecek
    --------------------------------------------------------------------------------------------------------------
    form'u gönderdikten sonra içinin temizlenmesi için gereken işlemler
    form compenentlarımızdaki inputlar value vermedik, value veririz
    -------------------------------------------------------------
    1.yöntem
    addContact([...contacts,form])'ın hemen altına
    setForm({fullname:'',phone_number:''})
    yazılır
    -------------------------------------------------------------
    2.yöntem
    form compenentındaki ---const [form,setForm] = useState({fullname:'', phone_number:''})--- , useState in içi boşaltılır
    form fonksiyonunun üstüne ---const initialFormValues = {fullname:'', phone_number:''} --- böyle bir şey oluştururum
    sonra bunu --- const [form,setForm] = useState(initalFormValue)--- şöyle useState 'e veririm
    setForm(initialFormValues) değerini veririm
    -------------------------------------------------
    3.yöntem, form işlemini onSubmit'te yapmak istemiyorsak,bunu yan etkileri kullanarak yapmak istiyorsak
    form compenentına useEffect import edilir
    const [form,setForm] = useState(initalFormValue)'ın altına
    useEffect(()=> {
        setForm(initalFormValues)
    },[contacts])
    yapılıp
    addContact'ın altıntaki setForm silinir
    ---bu contacts değiştikten sonra, input'un içine boşalt demek istedik, bu değiştiğinde ne demektir
    --------------------------------------------------------------------------------------------------------
--------------
-------------
---------------
    -----------
    2.video listeleme işlemi
    List compenent'ını zaten hazırlamaya başlamıştık
    Şimdi tek yapmamız gereken, burada eklenen kayıtları --- const [contacts,setContacts] = useState([])--- oraya prop olarak göndermek
    contacts compenentına gidip, 
    <List contacts={contacts}/> yazarak list compenent'ına veri göndeririz
    sonra list compenentı içinde ,
    gerekli listeleme işlemini yapmak
    function List({contatcs}) yazarak oradaki prop'u alırız
    sonra ilgili listeleme işlemini yaparız

    map dedikten sonra bana her defasında bir contact gelecek, ve ben bu kayıtları bir li içinde göstereceğim

    -------------
    ---------------
    ----------------
    3.video filtreleme işlemi
    list compenent'ına git ve div'in hemen altına input yerleştir


    contacts compenenta git ve useState in içine isim ve tel değerini gir, her defasında uğraşmamak için geçici olarak yapıyoruz
    
    Şuan kayıtlar görünüyor,input'a veri girildiği an state e yazmamız lazım,
    const [filterText,setFilterText] = useState('')
    sonra input e value olarak filterText girilir, onChange olarak da array fonksiyonlu setFilterText verilir
    <input 
    value={filterText}
    onChange={(e) => setFilterText(e.target.value)} >
    ---------------------------------
    Biz bu listelemeyi yaparken , doğrudan şu contacts i maplıyoruz ya, bu contacts i maplemek yerine, bu contacts i yukarıda filtreleyip,
    sonra o , filtrelenmiş sonuçları listelememiz gerekiyor
    ------------------------------------------------------------
    List compenentına fonksiyonun altına,
    const filtered = contacts.filter((item)=>{          ----buradaki item , array in her bir elemanı demek---,filter her döndüğünde bize item gelecek
        return Object.keys(item).some((key) => 
            item[key]
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase())
        )
    })
    isminide yazsa numarasını da yazsa, göstermemiz lazım, object.keys , anahtarları dizi şeklinde dönderir,item'in keylerini aldım, bunlar , fullname ve phone_number
    .some() herhangi biri demek boolean değeri verir,herhangi biri şarta uyuyorsa true değerini dönderir
    some'a objenin key'i gelecek,
    item[key]'i item[fullname] gibi düşünebilirsin
    loLowerCase yapmamızın sebebi , büyük harflerle mehmet yazılsa bile,biz onu küçük harflere çevirecez ki, arama yaparken ,
    küçük büyük harf problemi yaşamayalım
    includes() var mı yok mu, boolean değer döndürür

    --------------------------
    contacts.map e git, contacts yerine filtered yaz
    -------------------------------------
    ---------------
    -----------------
    ----------------
    






