# Protobuf Viewer

This protobuf viewer is intended to be used with the mobile game Beatstar.

Beatstar doesn't follow traditional protobuf guidelines. While most things are unchanged Beatstar uses a `type` field at times to indicate which group to use which means groups may have different names for the same key.

This repo exports 3 items: ProtobufReader, ProtobufWriter and CMSRequester.

## Reading Protobufs

```const buffer: Buffer = fs.readFileSync('...');
const reader = new ProtobufReader(buffer);
reader.raw() // prints an attempted deconstruction of the protobuf
const data = reader.process(proto)
```

Proto should be an object containing a mapping of keys to types such as

```
{
  "1": {
    "name": "id",
    "type": "varint"
  }
}
```

## Writing Protobufs

```
const data = { id: 1 };
const writer = new ProtobufWriter(data);
const built = writer.build(proto)
```

Proto again should be an object as described above.

## Reading CMS

To read the CMS files there are two methods.

`CMSRequester.getCms()` will return a list of CMS files and their links to download as protobuf files.

Some protobufs (NewsFeed, LiveOpsBundleConfig, LiveOpsDeeplinkRewardConfig, LiveOpsEventConfig and LiveOpsSeasonConfig) are retrieved during the login process and need to be fetched separately. This can be done with the following:

`CMSRequester.getExtraCms()`

This will return the CMS files in a parsed form.
