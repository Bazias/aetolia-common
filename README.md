# aetolia-common

Common Data for Aetolia

## Goal

There is common data in Aetolia that all systems of which all systems make use. This project is an attempt to provide a centralized copy of this datasuch that anyone can import the data into their systems and reduce the burden in maitenance within the community.

## Contributing

Contributions are welcome! Please submit PRs, and I'm happy to work with folks to make adjustments to promote adoption.

Currently, everything is formatted with `prettier` and CI will fail if unformated code is submitted. To run prettier yourself, you'll need to install [node](https://nodejs.org/en) and run `npm install` to install the dependencies. `npx prettier . --write` will format everything for you! (Bewarned, this does edit your changes.)

## Schema

Below details the schema of each category of data.

### Afflictions

Afflictions should be kept in [`afflictions.yaml`](./src/afflictions.yaml).

```yaml
<name>:
  diagnose: "<regex>"
  cure_message: "<string>"
  types:
    physical: <bool>
    mental: <bool>
    venom: <bool>
    random: <bool>
  cures:
    pill: <string>
    poultice: <string>
    smoked: <string>
    special: <string>
```

### Cures

Cures should be kept in [`cures.yaml`](./src/cures.yaml).

```yaml
<queue>:
  <cure>:
    - location: <string>
      heals:
        health: <bool>
        mana: <bool>
      defence: <string>
      order:
        - <affliction>
```

### Defences

Defences should be kept in [`defences.yaml`](./src/defences.yaml).

```yaml
<defence>:
  message: <string>
  drains:
    health: <num>
    mana: <num>
    endurance: <num>
    willpower: <num>
  persistence:
    strippable: <bool>
    death: <bool>
    class_change: <bool>
  access:
    - skillset: <string>
      skill: <string>
```

Not all defences belong to a skillset (e.g. `rebounding`), but in such cases, assign them to the `general` skillset and use the `defence` name as the `skill` name.

### Skills

Skills should be kept in [`skills.yaml`](./src/skills.yaml).

```yaml
<skillset>:
  <skill>:
    - syntax: <string>
      requires:
        <queue>: <bool>
      consumes:
        <queue>: <bool>
      channeled: <bool>
```

The `syntax` should match the AB <SKILL> content. Each skill is presented as a list to allow for multiple syntaxes or to represent different configurations. For example, `onslaught` and `seethe` from `brutality` will look like this:

```yaml
brutality:
  onslaught:
    - syntax: ONSLAUGHT <target> <[ab] [param]> <[ab] [param]>
      requires:
        bal: true
        eq: true
      consumes:
        bal: true
  seethe:
    - syntax: SEETHE
      requires:
        bal: true
        eq: true
      consumes:
        bal: true
    - syntax: SEETHE HEIGHTEN
      requires:
        bal: true
        eq: true
      consumes:
        bal: true
      channeled: true
```

Multiple entries for a skill should be used when the permutations change what queues are required or consumed or if one version is channeled. Likewise, for skills that have multiple syntaxes that represent different effects should receive multiple entries, e.g. `shapeshifting` from `shapeshifting`.

Valid queues are as follows:

- bal
- eq
- sec
- elixir
- anabiotic
- pill
- poultice
- pipe
- tree
- focus
