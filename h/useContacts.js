import React from 'react';
import * as Contacts from 'expo-contacts';

function getContactNumber(contact) {
  let contactPhoneNumber;
  let contactPhoneType;
  contact.phoneNumbers?.forEach((phoneNumber) => {
    if (phoneNumber.label == 'mobile') {
      contactPhoneNumber = phoneNumber.digits;
      contactPhoneType = 'mobile';
    }
    // if (
    //   contactPhoneType != 'mobile' &&
    //   // this will always return false, currently, assuming
    //   // we need to fill it in
    //   [].includes(phoneNumber.label)
    // ) {
    //   contactPhoneNumber = phoneNumber.digits;
    //   contactPhoneType = phoneNumber.label;
    // }
  });

  return contactPhoneNumber ? contactPhoneNumber : null;
}

export default function useContacts(allowed) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const f = async () => {
      if (allowed) {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        setData(data);
      }
    };
    f();
  }, [allowed, setData]);

  if (!allowed) {
    return [];
  }

  if (data.length === 0) {
    return [];
  }

  const contacts = [];
  data
    .filter((contact) => contact.contactType === 'person')
    .forEach((contact) => {
      const contactPhoneNumber = getContactNumber(contact);

      if (!contactPhoneNumber) {
        return;
      }

      const contactToShow = {
        type: 'contact',
        name: contact.name,
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contactPhoneNumber,
        // turns out phone numbers can exist in the book multiple times
        // even this seems like an imperfect solution
        id: `${contactPhoneNumber}${contact.name}`,
      };
      contacts.push(contactToShow);
    });

  return contacts;
}
