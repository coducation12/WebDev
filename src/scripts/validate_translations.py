import os
import re

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    context_file = os.path.join(project_root, "context", "LanguageContext.tsx")

    print(f"Reading LanguageContext.tsx from: {context_file}")
    if not os.path.exists(context_file):
        print("Error: LanguageContext.tsx not found!")
        exit(1)

    with open(context_file, "r", encoding="utf-8") as f:
        content = f.read()

    # Simple parser to find ko and en translations blocks
    # We will locate the ko block and en block using regex
    ko_match = re.search(r'ko:\s*\{(.*?)\},', content, re.DOTALL)
    en_match = re.search(r'en:\s*\{(.*?)\},', content, re.DOTALL)

    if not ko_match or not en_match:
        print("Error: Could not extract ko or en translation tables!")
        exit(1)

    ko_block = ko_match.group(1)
    en_block = en_match.group(1)

    # Parse key-value pairs
    def parse_pairs(block):
        pairs = {}
        # Matches "key": "value" or 'key': 'value'
        matches = re.findall(r'["\'](.*?)["\']:\s*["\'](.*?)["\']', block)
        for k, v in matches:
            pairs[k.strip()] = v.strip()
        return pairs

    ko_translations = parse_pairs(ko_block)
    en_translations = parse_pairs(en_block)

    print(f"Parsed {len(ko_translations)} Korean translation keys.")
    print(f"Parsed {len(en_translations)} English translation keys.")

    errors = 0
    warnings = 0

    # 1. Check matching keys
    ko_keys = set(ko_translations.keys())
    en_keys = set(en_translations.keys())

    only_in_ko = ko_keys - en_keys
    only_in_en = en_keys - ko_keys

    if only_in_ko:
        print(f"ERROR: Keys found only in 'ko' table: {only_in_ko}")
        errors += len(only_in_ko)
    if only_in_en:
        print(f"ERROR: Keys found only in 'en' table: {only_in_en}")
        errors += len(only_in_en)

    # 2. Check for empty values
    for k, v in ko_translations.items():
        if not v:
            print(f"WARNING: Empty translation value for key '{k}' in 'ko'")
            warnings += 1
    for k, v in en_translations.items():
        if not v:
            print(f"WARNING: Empty translation value for key '{k}' in 'en'")
            warnings += 1

    # 3. Check for specific English grammar/spelling warnings in en translations
    # E.g., double spaces or non-standard characters
    for k, v in en_translations.items():
        if "  " in v:
            print(f"WARNING: Double space found in English translation for '{k}': '{v}'")
            warnings += 1
        # Check if the English menu starts with lowercase unless it's a specific acronym like CI
        if len(v) > 0 and v[0].islower() and v != "English":
            print(f"WARNING: English translation for '{k}' starts with lowercase: '{v}'")
            warnings += 1

    # 4. Check for common typos in English logistics translations
    common_typos = {
        "equitment": "equipment",
        "logistecs": "logistics",
        "inframstructure": "infrastructure",
        "Clearance": "clearance", # casing is fine, but check spelling
    }
    for k, v in en_translations.items():
        v_lower = v.lower()
        for typo, correct in common_typos.items():
            if typo in v_lower:
                print(f"ERROR: Potential typo in English translation for '{k}': found '{typo}', did you mean '{correct}'?")
                errors += 1

    print("\nTranslation validation summary:")
    print(f"Errors found: {errors}")
    print(f"Warnings found: {warnings}")

    if errors > 0:
        print("Validation FAILED due to errors.")
        exit(1)
    else:
        print("Validation PASSED successfully.")
        exit(0)

if __name__ == "__main__":
    main()
