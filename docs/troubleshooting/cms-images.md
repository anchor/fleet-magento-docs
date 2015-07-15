Magento Admin > CMS > Pages > Manage Content image insertion fails
------------------------------------------------------------------

If when attempting to insert an image via the WYSIWYG editor images are not
listed, or take a very long time to display, this is likely due to MySQL scanning
through the large number of rows in the `core_file_storage` table matching
`directory = 'wysiwyg'` without using an index.

To fix this issue, add the following index to your Magento database:
```sql
CREATE INDEX IDX_CORE_FILE_STORAGE_DIRECTORY ON core_file_storage (directory ASC);
```
If you are using a table prefix you will need to adjust the above command to include
the prefix.
