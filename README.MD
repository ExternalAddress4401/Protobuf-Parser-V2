# Protobuf Reader

Beatstar makes heavy use of protobufs and not always in accepted forms. Some fields are dynamic and a type field determines what the other field names will be which isn't covered under the protobuf format explicitly. This reader aims to cover these nuances.
