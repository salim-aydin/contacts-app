import {useState} from 'react'

function Form({addContact,contacts}) {
    const [form,setForm] = useState({fullname:'', phone_number:''})
    // inputun içeriği değişti anda state ataması için gerekli olan fonksiyonu aşağıda yazacağız
    const onChangeInput = (e) => {
        setForm({...form,[e.target.name]: e.target.value}) // girilen value(e.target.value) ne ise , onu e.target.name ' e eşitleyecez
    }
    const onSubmit = (e) => {
        e.preventDefault() // form işlemini konsolda görmek için gereken kod
        if (form.fullname === '' || form.phone_number === ''){
            return false // return false ise işlemi göstermiyor (console.log(form) işlemini yapmıyor)
        }
        addContact([...contacts,form])
        setForm({fullname:'',phone_number:''})

    }
  return (
    <form onSubmit={onSubmit}>
        <div>
            <input name='fullname' placeholder='Full Name' onChange={onChangeInput} value={form.fullname}/>
        </div>
        <div>
            <input name='phone_number'placeholder='Phone Number'onChange={onChangeInput} value={form.phone_number}/>
        </div>
        <div className='btn'>
            <button onClick={onSubmit}>Add</button>
        </div>


    </form>
  )
}

export default Form