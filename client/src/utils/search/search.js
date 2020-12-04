// ============================== Server ============================
import Image from '@app/media/zzzzzzzzzzzzz.jpg';
import Image1 from '@app/media/5e30f26a42d8dd0019a3faad.jpg';
import Image2 from '@app/media/5e30f26a42d8dd0019a3faae.jpg';
import Image3 from '@app/media/5e30f26b42d8dd0019a3fab2.jpg';
import Image4 from '@app/media/5d12d5d19ecc3516ce8de52b.jpg';



export function searchData(type) {
    return new Promise((resolve, reject) => {
        try {
            switch (type.toUpperCase()) {
                case 'ANIMAL':
                    resolve(searchData_animal);
                    break;
                case 'FRUIT':
                    resolve(searchData_fruit);
                    break;
                case 'DEVICE':
                    resolve(searchData_device);
                    break;
                case 'ALL':
                    let allData = [];
                    allData = allData.concat(searchData_animal);
                    allData = allData.concat(searchData_fruit);
                    allData = allData.concat(searchData_device);
                    resolve(allData);
                    break;
                default: resolve([]); break;
            }
            resolve();
        } catch(err) {
            console.error(err);
            reject();
        }
    })
}

export function searchDataWithId(id) {
    return new Promise((resolve, reject) => {
        try {
            let allData = [];
            allData = allData.concat(searchData_animal.filter((animal) => id === animal.id));
            allData = allData.concat(searchData_fruit.filter((fruit) => id === fruit.id));
            allData = allData.concat(searchData_device.filter((device) => id === device.id));
            const a = allData.filter((data) => {
                return data.id === id
            })
            resolve(a);
        } catch (err) {
            console.error(err);
            reject();
        }
    })
}

let searchData_animal = [
    {
        id: '1',
        name: 'ANIMAL_1',
        desc: 'asdfasdfasdfadsfadsfadsfapojfoiajsfdna;enflkanmlkjalkdmflkamlkewflwnfasndvnaskjdnvlksamdlkfmalskjemalksmlkmcvlkamslmvaf',
        src: [Image, Image, Image, Image]
    },
    {
        id: '2',
        name: 'ANIMAL_2',
        desc: 'asdfasdfasdfadsfadsfadsfapojfoiajsfdna;enflkanmlkjalkdmflkamlkewflwnfasndvnaskjdnvlksamdlkfmalskjemalksmlkmcvlkamslmvaf',
        src: [Image1, Image, Image, Image]
    },
    {
        id: '3',
        name: 'ANIMAL_3',
        desc: 'asdfasdfasdfadsfadsfadsfapojfoiajsfdna;enflkanmlkjalkdmflkamlkewflwnfasndvnaskjdnvlksamdlkfmalskjemalksmlkmcvlkamslmvaf',
        src: [Image2, Image, Image, Image]
    },
    {
        id: '4',
        name: 'ANIMAL_4',
        desc: 'asdfasdfasdfadsfadsfadsfapojfoiajsfdna;enflkanmlkjalkdmflkamlkewflwnfasndvnaskjdnvlksamdlkfmalskjemalksmlkmcvlkamslmvaf',
        src: [Image3, Image, Image, Image]
    },
    {
        id: '5',
        name: 'ANIMAL_5',
        desc: 'asdfasdfasdfadsfadsfadsfapojfoiajsfdna;enflkanmlkjalkdmflkamlkewflwnfasndvnaskjdnvlksamdlkfmalskjemalksmlkmcvlkamslmvaf',
        src: [Image4, Image, Image, Image]
    }
]

let searchData_fruit = [
    {
        id: '6',
        name: 'FRUIT_1',
        desc: 'asdfasdfasdfadsfadsfadsfapojfoiajsfdna;enflkanmlkjalkdmflkamlkewflwnfasndvnaskjdnvlksamdlkfmalskjemalksmlkmcvlkamslmvaf',
        src: [Image, Image, Image, Image]
    },
    {
        id: '7',
        name: 'FRUIT_2',
        desc: 'asdfasdfasdfadsfadsfadsfapojfoiajsfdna;enflkanmlkjalkdmflkamlkewflwnfasndvnaskjdnvlksamdlkfmalskjemalksmlkmcvlkamslmvaf',
        src: [Image, Image, Image, Image]
    },
    {
        id: '8',
        name: 'FRUIT_3',
        desc: 'asdfasdfasdfadsfadsfadsfapojfoiajsfdna;enflkanmlkjalkdmflkamlkewflwnfasndvnaskjdnvlksamdlkfmalskjemalksmlkmcvlkamslmvaf',
        src: [Image, Image, Image, Image]
    },
    {
        id: '9',
        name: 'FRUIT_4',
        desc: 'asdfasdfasdfadsfadsfadsfapojfoiajsfdna;enflkanmlkjalkdmflkamlkewflwnfasndvnaskjdnvlksamdlkfmalskjemalksmlkmcvlkamslmvaf',
        src: [Image, Image, Image, Image]
    },
    {
        id: '10',
        name: 'FRUIT_5',
        desc: 'asdfasdfasdfadsfadsfadsfapojfoiajsfdna;enflkanmlkjalkdmflkamlkewflwnfasndvnaskjdnvlksamdlkfmalskjemalksmlkmcvlkamslmvaf',
        src: [Image, Image, Image, Image]
    }
]

let searchData_device = [
    {
        id: '11',
        name: 'DEVICE_1',
        desc: 'asdfasdfasdfadsfadsfadsfapojfoiajsfdna;enflkanmlkjalkdmflkamlkewflwnfasndvnaskjdnvlksamdlkfmalskjemalksmlkmcvlkamslmvaf',
        src: [Image, Image, Image, Image]
    },
    {
        id: '12',
        name: 'DEVICE_2',
        desc: 'asdfasdfasdfadsfadsfadsfapojfoiajsfdna;enflkanmlkjalkdmflkamlkewflwnfasndvnaskjdnvlksamdlkfmalskjemalksmlkmcvlkamslmvaf',
        src: [Image, Image, Image, Image]
    },
    {
        id: '13',
        name: 'DEVICE_3',
        desc: 'asdfasdfasdfadsfadsfadsfapojfoiajsfdna;enflkanmlkjalkdmflkamlkewflwnfasndvnaskjdnvlksamdlkfmalskjemalksmlkmcvlkamslmvaf',
        src: [Image, Image, Image, Image]
    },
    {
        id: '14',
        name: 'DEVICE_4',
        desc: 'asdfasdfasdfadsfadsfadsfapojfoiajsfdna;enflkanmlkjalkdmflkamlkewflwnfasndvnaskjdnvlksamdlkfmalskjemalksmlkmcvlkamslmvaf',
        src: [Image, Image, Image, Image]
    },
    {
        id: '15',
        name: 'DEVICE_5',
        desc: 'asdfasdfasdfadsfadsfadsfapojfoiajsfdna;enflkanmlkjalkdmflkamlkewflwnfasndvnaskjdnvlksamdlkfmalskjemalksmlkmcvlkamslmvaf',
        src: [Image, Image, Image, Image]
    }
]
