// script.js
function pickRandomName() {
    const nameList = document.getElementById('nameList').value.split('\n').filter(name => name.trim() !== '');
    if (nameList.length === 0) {
        document.getElementById('result').textContent = 'Ism yoki Raqamlarni kiriting!';
        return;
    }
    const randomIndex = Math.floor(Math.random() * nameList.length);
    const randomName = nameList[randomIndex];
    document.getElementById('result').textContent = `Yutdi🥳: ${randomName}`;
}
