const menuButton=document.querySelector('.menu');
const siteNav=document.querySelector('.nav');
if(menuButton&&siteNav){
  menuButton.addEventListener('click',()=>{
    const isOpen=siteNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded',String(isOpen));
    menuButton.setAttribute('aria-label',isOpen?'Close navigation':'Open navigation');
  });
  siteNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    siteNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded','false');
    menuButton.setAttribute('aria-label','Open navigation');
  }));
}
document.querySelectorAll('.faq-q').forEach(question=>question.addEventListener('click',()=>{
  const item=question.closest('.faq-item');
  const isOpen=item.classList.toggle('open');
  question.setAttribute('aria-expanded',String(isOpen));
}));
const year=document.querySelector('#year');
if(year)year.textContent=new Date().getFullYear();
const inquiryForm=document.querySelector('#inquiry-form');
if(inquiryForm)inquiryForm.addEventListener('submit',async event=>{
  event.preventDefault();
  const values=new FormData(inquiryForm);
  const inquiry=[
    'Gateway Global Trade inquiry',
    `Name: ${values.get('name')}`,
    `Hotel/company: ${values.get('hotel')}`,
    `Email: ${values.get('email')}`,
    `Products and quantities: ${values.get('needs')}`
  ].join('\n');
  const result=document.querySelector('.form-result');
  result.style.display='block';
  result.innerHTML='<strong>Inquiry prepared.</strong><div class="copy-status">Copy the text below and send it to your Gateway Global Trade contact.</div><textarea readonly aria-label="Prepared inquiry"></textarea>';
  result.querySelector('textarea').value=inquiry;
  try{
    await navigator.clipboard.writeText(inquiry);
    result.querySelector('.copy-status').textContent='Inquiry copied. Share it with your Gateway Global Trade contact.';
  }catch{
    result.querySelector('.copy-status').textContent='Select and copy this text, then share it with your Gateway Global Trade contact.';
  }
});
